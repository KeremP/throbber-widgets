import React from 'react';
import { useThrobber, DEFAULT_SPEED } from './useThrobber';
import type { ThrobberProps } from './types';

export interface ThrobberBaseProps extends ThrobberProps {
  frames: readonly string[];
}

export const ThrobberBase: React.FC<ThrobberBaseProps> = ({
  frames,
  pulse = false,
  color = 'currentColor',
  speed = DEFAULT_SPEED,
  className,
  style,
}) => {
  const { frame, opacity } = useThrobber(frames, { speed, pulse });

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        color,
        opacity,
        display: 'inline-block',
        ...style,
      }}
    >
      {frame}
    </span>
  );
};
