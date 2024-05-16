// いらない可能性大

import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ResponsiveComponent: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 599 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return (
    <div>
      {isMobile && (
        <p>This is a mobile view.</p>
      )}
      {isTablet && (
        <p>This is a tablet view.</p>
      )}
      {isDesktop && (
        <p>This is a desktop view.</p>
      )}
    </div>
  );
};

export default ResponsiveComponent;
