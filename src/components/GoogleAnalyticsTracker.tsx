import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

interface Props {
  trackingId: string; // Google Analytics tracking ID
}

const GoogleAnalyticsTracker: React.FC<Props> = ({ trackingId }) => {
  useEffect(() => {
    ReactGA.initialize(trackingId);

    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [trackingId]);

  return null;
};

export default GoogleAnalyticsTracker;
