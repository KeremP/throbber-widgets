import type { CSSProperties } from 'react';

export interface ThrobberProps {
  /** Toggle sinusoidal opacity pulsing. Default: false */
  pulse?: boolean;
  /** CSS color string. Default: 'currentColor' */
  color?: string;
  /** Frame interval in ms, clamped to 50–500. Default: 100 */
  speed?: number;
  /** Optional className on the wrapping span */
  className?: string;
  /** Optional inline style overrides */
  style?: CSSProperties;
}
