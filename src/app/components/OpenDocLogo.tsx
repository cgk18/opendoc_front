"use client";

import React from 'react';

interface OpenDocLogoProps {
  width?: number;
  height?: number;
}

const OpenDocLogo: React.FC<OpenDocLogoProps> = ({ width = 120, height = 60 }) => {
  // Colors
  const lightBlue = "#67B7E8";
  const lighterBlue = "#B7D9EF";
  const white = "#FFFFFF";
  
  return (
    <svg width={width} height={height} viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      {/* Full horizontal bar that extends edge to edge */}
      <rect x="0" y="80" width="350" height="40" fill={lighterBlue} />
      
      {/* Small circle on top of the bar */}
      <circle cx="50" cy="100" r="30" fill={lightBlue} />
      
      {/* Large circle on top of the bar */}
      <circle cx="220" cy="100" r="100" fill={lightBlue} />
      
      {/* White center of large circle */}
      <circle cx="220" cy="100" r="30" fill={white} />
    </svg>
  );
};

export default OpenDocLogo;