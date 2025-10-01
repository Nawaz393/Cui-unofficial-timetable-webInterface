import React, { useMemo } from 'react';
import { Box, Chip, Typography, useTheme } from '@mui/material';

type DayName =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface RawBlock {
  class_name: string;
  class_room?: string;
  day: DayName | string;
  subject: string;
  teacher: string;
  time_slot: string; // "HH:mm-HH:mm"
}

interface PositionedBlock extends RawBlock {
  startMin: number;
  endMin: number;
  clashGroup?: number;
  clashIndex?: number;
  clashSize?: number;
}

export interface ScheduleGridProps {
  blocks: RawBlock[];
  classColors?: Record<string, string>;
  heightPx?: number; // total grid height
}

const DAY_ORDER: DayName[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const hhmmToMin = (hhmm: string): number => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return 0;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  return h * 60 + min;
};

const parseSlot = (slot: string): [number, number] => {
  const m = slot.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (!m) return [0, 60];
  return [hhmmToMin(m[1]), hhmmToMin(m[2])];
};

const pastel = [
  '#A5D6A7',
  '#90CAF9',
  '#FFCC80',
  '#CE93D8',
  '#80CBC4',
  '#F48FB1',
  '#C5E1A5',
  '#B39DDB',
  '#FFAB91',
  '#9FA8DA',
];

const getColor = (name: string, map?: Record<string, string>) => {
  if (map && map[name]) return map[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % pastel.length;
  return pastel[idx];
};

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  blocks,
  classColors,
  heightPx = 1000,
}) => {
  const theme = useTheme();
  // Normalize + position blocks per day
  const { days, positioned, minTime, maxTime } = useMemo(() => {
    const normalized: PositionedBlock[] = blocks
      .filter(Boolean)
      .map((b) => {
        const [startMin, endMin] = parseSlot(b.time_slot || '');
        return { ...b, startMin, endMin };
      })
      .filter((b) => b.endMin > b.startMin);

    // time bounds with padding
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

    // clash detection + column placement per day
    let clashCount = 0;
    for (const d of Object.keys(byDay)) {
      const arr = byDay[d].sort(
        (a, b) => a.startMin - b.startMin || a.endMin - b.endMin,
      );
      // groups of overlapping blocks
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
        if (g.length > 1) clashCount += g.length; // count all involved
        g.forEach((b, i) => {
          b.clashGroup = groupId;
          b.clashIndex = i;
          b.clashSize = g.length;
        });
      });

      byDay[d] = arr;
    }

    const dayKeys = Object.keys(byDay);
    const daysSorted = (DAY_ORDER as string[])
      .filter((d) => dayKeys.includes(d))
      .concat(dayKeys.filter((d) => !(DAY_ORDER as string[]).includes(d)));

    return {
      days: daysSorted,
      positioned: byDay,
      minTime: min,
      maxTime: max,
      clashes: clashCount,
    };
  }, [blocks]);

  const totalMinutes = maxTime - minTime;
  const hourMarks: number[] = [];
  for (let t = Math.ceil(minTime / 60) * 60; t <= maxTime; t += 60)
    hourMarks.push(t);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* Header row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `120px repeat(${days.length || 5}, 1fr)`,
          position: 'sticky',
          top: 0,
          zIndex: 2,
          background: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box />
        {(days.length ? days : DAY_ORDER.slice(0, 5)).map((d) => (
          <Box
            key={`hdr-${d}`}
            sx={{ p: 1.2, fontWeight: 700, textAlign: 'center' }}
          >
            {d}
          </Box>
        ))}
      </Box>

      {/* Body grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `120px repeat(${days.length || 5}, 1fr)`,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Time ruler */}
        <Box sx={{ position: 'relative', height: heightPx }}>
          {hourMarks.map((t) => {
            const top = ((t - minTime) / totalMinutes) * 100;
            return (
              <Box
                key={`r-${t}`}
                sx={{ position: 'absolute', top: `${top}%`, width: '100%' }}
              >
                <Typography variant='caption'>
                  {`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(
                    t % 60,
                  ).padStart(2, '0')}`}
                </Typography>
                <Box
                  sx={{ height: 1, background: theme.palette.divider, mt: 0.5 }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Day columns */}
        {(days.length ? days : DAY_ORDER.slice(0, 5)).map((d) => {
          const list = (positioned as )[d] || [];
          return (
            <Box
              key={`col-${d}`}
              sx={{
                position: 'relative',
                height: heightPx,
                borderLeft: `1px solid ${theme.palette.divider}`,
              }}
            >
              {hourMarks.map((t) => {
                const top = ((t - minTime) / totalMinutes) * 100;
                return (
                  <Box
                    key={`g-${d}-${t}`}
                    sx={{
                      position: 'absolute',
                      top: `${top}%`,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: theme.palette.divider,
                      opacity: 0.4,
                    }}
                  />
                );
              })}

              {list.map((b: PositionedBlock, idx: number) => {
                const top = ((b.startMin - minTime) / totalMinutes) * 100;
                const height = ((b.endMin - b.startMin) / totalMinutes) * 100;

                const size = b.clashSize || 1;
                const index = b.clashIndex || 0;
                const gap = 4; // px
                const widthPct = (100 - (size - 1) * (gap / 2)) / size;
                const leftPct = index * widthPct + index * (gap / 2);

                const bg = getColor(b.class_name, classColors);
                const isClash = (b.clashSize || 1) > 1;
                return (
                  <Box
                    key={`blk-${d}-${idx}-${b.class_name}-${b.subject}`}
                    sx={{
                      position: 'absolute',
                      top: `${top}%`,
                      height: `${height}%`,
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      p: 1,
                      borderRadius: 1.5,
                      boxShadow: isClash
                        ? `inset 0 0 0 2px ${theme.palette.error.main}`
                        : '0 2px 8px rgba(0,0,0,0.15)',
                      background: bg,
                      color: '#111',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography
                      variant='caption'
                      sx={{ fontWeight: 700, display: 'block' }}
                    >
                      {b.subject}{' '}
                      <Chip
                        size='small'
                        label={b.class_name}
                        sx={{ ml: 0.5 }}
                      />
                    </Typography>
                    <Typography variant='caption' sx={{ display: 'block' }}>
                      {b.teacher} {b.class_room ? `• ${b.class_room}` : ''}
                    </Typography>
                    <Typography variant='caption'>{b.time_slot}</Typography>
                    {isClash && (
                      <Typography
                        variant='overline'
                        sx={{
                          display: 'block',
                          color: theme.palette.error.dark,
                        }}
                      >
                        CLASH
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      {/* Legend */}
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {Array.from(new Set(blocks.map((b) => b.class_name))).map((c) => (
          <Chip
            key={c}
            label={c}
            sx={{ background: getColor(c, classColors), color: '#111' }}
          />
        ))}
        <Chip
          label='Clash highlighted with red border'
          variant='outlined'
          sx={{ borderColor: theme.palette.error.main }}
        />
        <Chip label={`Total items: ${blocks.length}`} variant='outlined' />
      </Box>
    </Box>
  );
};
