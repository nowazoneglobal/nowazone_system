import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // duration in seconds
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  gapClassName?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 32,
  reverse = false,
  pauseOnHover = true,
  className = '',
  gapClassName = 'gap-3 sm:gap-4 pr-3 sm:pr-4',
}) => {
  return (
    <div
      className={`overflow-hidden w-full select-none relative ${className}`}
      style={{
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      <div
        className={`flex w-max tools-track ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className={`flex shrink-0 ${gapClassName} items-center`}>
          {children}
        </div>
        <div
          className={`flex shrink-0 ${gapClassName} items-center`}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
