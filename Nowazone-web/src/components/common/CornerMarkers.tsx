import React from 'react';

interface CornerMarkersProps {
  colorClass?: string;
}

export const CornerMarkers: React.FC<CornerMarkersProps> = ({ colorClass = 'text-base-content/40' }) => {
  return (
    <>
      <i className={`corner tl ${colorClass}`} aria-hidden="true" />
      <i className={`corner tr ${colorClass}`} aria-hidden="true" />
      <i className={`corner bl ${colorClass}`} aria-hidden="true" />
      <i className={`corner br ${colorClass}`} aria-hidden="true" />
    </>
  );
};
