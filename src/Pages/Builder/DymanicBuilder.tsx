import React, { useMemo, useState } from 'react';
import {
  Box, Button, Card, CardContent, Container, Divider, IconButton,
  InputAdornment, List, ListItem, ListItemButton, ListItemText,
  Stack, TextField, Typography, useMediaQuery, Chip, CircularProgress,
  Alert, Fade, Zoom
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import { AutoCompleteDropDown, Title } from '../../components';
import { useMyContext } from '../../context';
import { fetchSubjectSchedule } from '../Subjects/fetchSubjectSchedule';
import { fetchTimeTable } from '../Timetable/fetchTimeTable';
import SeoHelmet from '../../components/Seo/SeoHelmet';

// Types
type DayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface RawBlock {
  class_name: string;
  class_room?: string;
  day: DayName | string;
  subject: string;
  teacher: string;
  time_slot: string;
}

type Offering = {
  subject: string;
  teacher: string;
  class_name: string;
};

interface PositionedBlock extends RawBlock {
  startMin: number;
  endMin: number;
  clashGroup?: number;
  clashIndex?: number;
  clashSize?: number;
}

// Constants
const DAY_ORDER: DayName[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const pastelColors = [
  '#E3F2FD', '#E8F5E8', '#FFF3E0', '#F3E5F5', '#E0F2F1',
  '#FCE4EC', '#F1F8E9', '#EDE7F6', '#FBE9E7', '#E8EAF6'
];

const getColorForClass = (className: string): string => {
  let hash = 0;
  for (let i = 0; i < className.length; i++) {
    hash = className.charCodeAt(i) + ((hash << 5) - hash);
  }
  return pastelColors[Math.abs(hash) % pastelColors.length];
};

const parseTimeSlot = (slot: string): [number, number] => {
  const match = slot.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (!match) return [0, 60];
  
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  return [parseTime(match[1]), parseTime(match[2])];
};

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Enhanced Schedule Grid Component
export const ScheduleGrid: React.FC<{
  blocks: RawBlock[];
  heightPx?: number;
}> = ({ blocks, heightPx = 800 }) => {
  const { days, positioned, minTime, maxTime, clashCount } = useMemo(() => {
    const normalized: PositionedBlock[] = blocks
      .filter(Boolean)
      .map((b) => {
        const [startMin, endMin] = parseTimeSlot(b.time_slot || '');
        return { ...b, startMin, endMin };
      })
      .filter((b) => b.endMin > b.startMin);

    let min = 24 * 60;
    let max = 0;
    for (const b of normalized) {
      if (b.startMin < min) min = b.startMin;
      if (b.endMin > max) max = b.endMin;
    }
    if (min === 24 * 60) {
      min = 8 * 60;
      max = 18 * 60;
    }
    min = Math.max(0, min - 30);
    max = Math.min(24 * 60, max + 30);

    const byDay: Record<string, PositionedBlock[]> = {};
    for (const b of normalized) {
      const d = b.day;
      byDay[d] = byDay[d] || [];
      byDay[d].push(b);
    }

    // Enhanced clash detection
    let totalClashes = 0;
    for (const d of Object.keys(byDay)) {
      const arr = byDay[d].sort((a, b) => a.startMin - b.startMin || a.endMin - b.endMin);
      
      let group: PositionedBlock[] = [];
      let gEnd = -1;
      const groups: PositionedBlock[][] = [];
      
      for (const b of arr) {
        if (!group.length) {
          group = [b];
          gEnd = b.endMin;
        } else if (b.startMin < gEnd) {
          group.push(b);
          gEnd = Math.max(gEnd, b.endMin);
        } else {
          groups.push(group);
          group = [b];
          gEnd = b.endMin;
        }
      }
      if (group.length) groups.push(group);

      groups.forEach((g, groupId) => {
        if (g.length > 1) totalClashes += g.length;
        g.forEach((b, i) => {
          b.clashGroup = groupId;
          b.clashIndex = i;
          b.clashSize = g.length;
        });
      });

      byDay[d] = arr;
    }

    const dayKeys = Object.keys(byDay);
    const daysSorted = DAY_ORDER.filter((d) => dayKeys.includes(d))
      .concat(dayKeys.filter((d) => !DAY_ORDER.includes(d)));

    return {
      days: daysSorted,
      positioned: byDay,
      minTime: min,
      maxTime: max,
      clashCount: totalClashes,
    };
  }, [blocks]);

  if (blocks.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        py: 8,
        color: 'text.secondary'
      }}>
        <CalendarTodayIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>No classes scheduled</Typography>
        <Typography variant="body2">Add some offerings to see your timetable</Typography>
      </Box>
    );
  }

  const totalMinutes = maxTime - minTime;
  const hourMarks: number[] = [];
  for (let t = Math.ceil(minTime / 60) * 60; t <= maxTime; t += 60) {
    hourMarks.push(t);
  }

  const gridCols = `120px repeat(${days.length || 5}, 1fr)`;

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* Stats bar */}
      <Card sx={{ mb: 2, bgcolor: clashCount > 0 ? 'warning.light' : 'success.light' }}>
        <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2" fontWeight="medium">
                {blocks.length} classes
              </Typography>
            </Box>
            {clashCount > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
                <WarningIcon fontSize="small" />
                <Typography variant="body2" fontWeight="medium">
                  {clashCount} clashes detected
                </Typography>
              </Box>
            )}
            <Box sx={{ ml: 'auto' }}>
              <Stack direction="row" spacing={1}>
                {Array.from(new Set(blocks.map(b => b.class_name))).slice(0, 3).map(className => (
                  <Chip 
                    key={className} 
                    label={className} 
                    size="small"
                    sx={{ bgcolor: getColorForClass(className) }}
                  />
                ))}
                {Array.from(new Set(blocks.map(b => b.class_name))).length > 3 && (
                  <Chip 
                    label={`+${Array.from(new Set(blocks.map(b => b.class_name))).length - 3} more`} 
                    size="small" 
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card>
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          {/* Header row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              bgcolor: 'grey.50',
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Box sx={{ p: 2, fontWeight: 600, color: 'text.secondary', borderRight: 1, borderColor: 'divider' }}>
              Time
            </Box>
            {(days.length ? days : DAY_ORDER.slice(0, 5)).map((day) => (
              <Box
                key={`header-${day}`}
                sx={{ 
                  p: 2, 
                  fontWeight: 600, 
                  textAlign: 'center',
                  borderRight: 1,
                  borderColor: 'divider',
                  '&:last-child': { borderRight: 0 }
                }}
              >
                {day}
              </Box>
            ))}
          </Box>

          {/* Body grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: gridCols }}>
            {/* Time column */}
            <Box sx={{ position: 'relative', height: heightPx, borderRight: 1, borderColor: 'divider' }}>
              {hourMarks.map((time) => {
                const top = ((time - minTime) / totalMinutes) * 100;
                return (
                  <Box
                    key={`time-${time}`}
                    sx={{ position: 'absolute', width: '100%', top: `${top}%` }}
                  >
                    <Typography variant="caption" sx={{ px: 1, py: 0.5, bgcolor: 'background.paper', color: 'text.secondary' }}>
                      {formatTime(time)}
                    </Typography>
                    <Divider sx={{ mt: 0.5, opacity: 0.5 }} />
                  </Box>
                );
              })}
            </Box>

            {/* Day columns */}
            {(days.length ? days : DAY_ORDER.slice(0, 5)).map((day) => {
              const dayBlocks = positioned[day] || [];
              return (
                <Box
                  key={`day-${day}`}
                  sx={{ 
                    position: 'relative', 
                    height: heightPx, 
                    borderRight: 1, 
                    borderColor: 'divider',
                    '&:last-child': { borderRight: 0 }
                  }}
                >
                  {/* Hour grid lines */}
                  {hourMarks.map((time) => {
                    const top = ((time - minTime) / totalMinutes) * 100;
                    return (
                      <Divider
                        key={`grid-${day}-${time}`}
                        sx={{ 
                          position: 'absolute', 
                          width: '100%', 
                          top: `${top}%`,
                          opacity: 0.3
                        }}
                      />
                    );
                  })}

                  {/* Class blocks */}
                  {dayBlocks.map((block: PositionedBlock, index: number) => {
                    const top = ((block.startMin - minTime) / totalMinutes) * 100;
                    const height = ((block.endMin - block.startMin) / totalMinutes) * 100;

                    const clashSize = block.clashSize || 1;
                    const clashIndex = block.clashIndex || 0;
                    const widthPercent = 100 / clashSize;
                    const leftPercent = (clashIndex * widthPercent);

                    const isClash = clashSize > 1;

                    return (
                      <Zoom key={`block-${day}-${index}`} in timeout={300 + index * 100}>
                        <Card
                          sx={{
                            position: 'absolute',
                            top: `${top}%`,
                            height: `${height}%`,
                            left: `${leftPercent}%`,
                            width: `${widthPercent - 1}%`,
                            minHeight: '60px',
                            bgcolor: getColorForClass(block.class_name),
                            border: isClash ? 2 : 1,
                            borderColor: isClash ? 'error.main' : 'divider',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                              transform: 'scale(1.02)',
                              zIndex: 10,
                              boxShadow: 3
                            }
                          }}
                        >
                          <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                              {block.subject}
                            </Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.5 }}>
                              <PersonIcon sx={{ fontSize: 12 }} />
                              <Typography variant="caption">
                                {block.teacher}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.5 }}>
                              <ClassIcon sx={{ fontSize: 12 }} />
                              <Typography variant="caption">
                                {block.class_room || 'TBA'}
                              </Typography>
                            </Stack>
                            <Typography variant="caption">
                              {block.time_slot || 'TBA'}
                            </Typography>
                            {isClash && (
                              <Chip
                                label="CLASH"
                                size="small"
                                color="error"
                                sx={{ mt: 0.5, fontSize: '0.6rem', height: 16 }}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </Zoom>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

// Main Component
export const DynamicBuilder: React.FC = () => {
  const { subjects } = useMyContext();
  const isSmall = useMediaQuery('(max-width:900px)');

  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [offeringsFilter, setOfferingsFilter] = useState<string>('');
  const [loadingOfferings, setLoadingOfferings] = useState<boolean>(false);

  const [selected, setSelected] = useState<Record<string, Offering>>({});
  const [blocksByClass, setBlocksByClass] = useState<Record<string, RawBlock[]>>({});
  const [loadingClass, setLoadingClass] = useState<string | null>(null);

  const aggregatedBlocks: RawBlock[] = useMemo(
    () => Object.values(blocksByClass).flat(),
    [blocksByClass]
  );

  const clashCount = useMemo(() => {
    const parse = (slot: string) => {
      const m = slot.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
      if (!m) return [0, 0];
      const hhmm = (x: string) => {
        const [h, m] = x.split(':').map((n) => parseInt(n, 10));
        return h * 60 + m;
      };
      return [hhmm(m[1]), hhmm(m[2])];
    };
    let c = 0;
    const byDay: Record<string, RawBlock[]> = {};
    for (const b of aggregatedBlocks) {
      byDay[b.day] = byDay[b.day] || [];
      byDay[b.day].push(b);
    }
    for (const d of Object.keys(byDay)) {
      const arr = byDay[d].slice().sort((a, b) => {
        const [as] = parse(a.time_slot);
        const [bs] = parse(b.time_slot);
        return as - bs;
      });
      for (let i = 0; i < arr.length; i++) {
        const [as, ae] = parse(arr[i].time_slot);
        for (let j = i + 1; j < arr.length; j++) {
          const [bs, be] = parse(arr[j].time_slot);
          if (as < be && bs < ae) { c += 1; break; }
        }
      }
    }
    return c;
  }, [aggregatedBlocks]);

  const handleSubjectSelect = async (subject: string) => {
    setSelectedSubject(subject);
    setOfferings([]);
    if (!subject) return;
    setLoadingOfferings(true);
    try {
      const res = await fetchSubjectSchedule(subject);
      const list: RawBlock[] = res?.data || [];
      // Unique by (class_name, teacher)
      const uniq: Record<string, Offering> = {};
      list.forEach((b) => {
        const key = `${b.class_name}__${b.teacher}`;
        if (!uniq[key]) uniq[key] = { subject, class_name: b.class_name, teacher: b.teacher };
      });
      setOfferings(Object.values(uniq));
    } finally { 
      setLoadingOfferings(false); 
    }
  };

  const addOffering = async (o: Offering) => {
    if (selected[o.class_name]) return;
    setSelected((prev) => ({ ...prev, [o.class_name]: o }));
    setLoadingClass(o.class_name);
    try {
      const res = await fetchTimeTable(o.class_name);
      const data = res?.data || {};
      
      // Convert the grouped data structure to flat array
      const list: RawBlock[] = [];
      Object.keys(data).forEach(day => {
        const daySchedule = data[day] || [];
        daySchedule.forEach((item: any) => {
          list.push({
            class_name: item.class_name,
            class_room: item.class_room,
            day: item.day,
            subject: item.subject,
            teacher: item.teacher,
            time_slot: item.time_slot
          });
        });
      });
      
      setBlocksByClass((prev) => ({ ...prev, [o.class_name]: list }));
    } finally { 
      setLoadingClass(null); 
    }
  };

  const removeClass = (name: string) => {
    const s = { ...selected }; 
    const b = { ...blocksByClass };
    delete s[name]; 
    delete b[name];
    setSelected(s); 
    setBlocksByClass(b);
  };

  const filteredOfferings = useMemo(() => {
    const q = offeringsFilter.trim().toLowerCase();
    if (!q) return offerings;
    return offerings.filter(
      (o) =>
        o.teacher.toLowerCase().includes(q) ||
        o.class_name.toLowerCase().includes(q) ||
        o.subject.toLowerCase().includes(q)
    );
  }, [offerings, offeringsFilter]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <SeoHelmet
        title="Dynamic Timetable Builder"
        description="Search a subject, choose a teacher/class combo, and see the class timetable in a beautiful clash-aware grid."
        keywords={['Cui unofficial timetable', 'Dynamic Timetable', 'Clash checker']}
      />
      
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Title title="Dynamic Timetable Builder" />
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            mt: 2, 
            maxWidth: 800, 
            mx: 'auto',
            fontWeight: 400
          }}
        >
          Search for subjects, select <strong>Teacher × Class</strong> combinations, and view your personalized
          timetable with automatic clash detection and visual highlights.
        </Typography>
      </Box>

      {clashCount > 0 && (
        <Fade in>
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>{clashCount} schedule clashes detected!</strong> Review your selections to avoid conflicting time slots.
            </Typography>
          </Alert>
        </Fade>
      )}

      <Box sx={{ display: 'flex', gap: 3, flexDirection: isSmall ? 'column' : 'row' }}>
        {/* Left Panel: subject search + offerings */}
        <Box sx={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Subject Search */}
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon />
                Search Subject
              </Typography>
              <AutoCompleteDropDown
                options={subjects}
                OnClick={handleSubjectSelect}
                title="Search subject"
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Filter */}
          <Card>
            <CardContent>
              <TextField
                fullWidth
                placeholder="Filter by teacher or class..."
                value={offeringsFilter}
                onChange={(e) => setOfferingsFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </CardContent>
          </Card>

          {/* Offerings */}
          <Card sx={{ flex: 1, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ClassIcon />
                {selectedSubject ? `Offerings for "${selectedSubject}"` : 'Available Offerings'}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense sx={{ maxHeight: 420, overflowY: 'auto' }}>
                {loadingOfferings && (
                  <ListItem sx={{ justifyContent: 'center', py: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={20} />
                      <Typography variant="body2" color="text.secondary">
                        Loading offerings...
                      </Typography>
                    </Box>
                  </ListItem>
                )}
                
                {!loadingOfferings && filteredOfferings.length === 0 && (
                  <ListItem sx={{ py: 4, flexDirection: 'column', alignItems: 'center' }}>
                    <ClassIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
                    <Typography variant="body2" color="text.secondary" align="center">
                      {selectedSubject ? 'No offerings found for this subject' : 'Select a subject to view offerings'}
                    </Typography>
                  </ListItem>
                )}
                
                {filteredOfferings.map((o, i) => (
                  <Fade key={`${o.class_name}-${o.teacher}-${i}`} in timeout={200 + i * 50}>
                    <ListItem
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        border: 1,
                        borderColor: 'divider',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          onClick={() => addOffering(o)}
                          disabled={!!selected[o.class_name] || loadingClass === o.class_name}
                          color="primary"
                        >
                          {loadingClass === o.class_name ? (
                            <CircularProgress size={20} />
                          ) : (
                            <AddIcon />
                          )}
                        </IconButton>
                      }
                    >
                      <ListItemButton 
                        onClick={() => addOffering(o)} 
                        disabled={!!selected[o.class_name]}
                        sx={{ borderRadius: 1 }}
                      >
                        <ListItemText 
                          primary={o.class_name} 
                          secondary={o.teacher}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Fade>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Right Panel: selections + grid */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Selected Classes */}
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" gap={2} flexWrap="wrap" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon />
                  Selected Classes
                </Typography>
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    label={`${aggregatedBlocks.length} classes`} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                  {clashCount > 0 && (
                    <Chip 
                      label={`${clashCount} clashes`} 
                      color="error" 
                      size="small"
                      icon={<WarningIcon />}
                    />
                  )}
                </Box>
              </Stack>
              
              {Object.keys(selected).length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                  <CalendarTodayIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
                  <Typography variant="body2">
                    No classes selected yet. Add offerings from the left panel.
                  </Typography>
                </Box>
              ) : (
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {Object.values(selected).map((s) => (
                    <Chip
                      key={s.class_name}
                      label={s.class_name}
                      onDelete={() => removeClass(s.class_name)}
                      deleteIcon={<DeleteOutlineIcon />}
                      sx={{ 
                        bgcolor: getColorForClass(s.class_name),
                        '& .MuiChip-deleteIcon': { fontSize: 16 }
                      }}
                    />
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* Timetable Grid */}
          <Box sx={{ flex: 1 }}>
            <ScheduleGrid blocks={aggregatedBlocks} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};