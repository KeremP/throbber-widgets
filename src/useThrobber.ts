import { useState, useEffect, useRef } from 'react';

const SPEED_MIN = 50;
const SPEED_MAX = 500;
export const DEFAULT_SPEED = 100;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export interface UseThrobberOptions {
  /** Frame interval in ms, clamped to 50–500. Default: 100 */
  speed?: number;
  /** Sinusoidal opacity pulsing. Default: false */
  pulse?: boolean;
}

export interface UseThrobberResult {
  frame: string;
  opacity: number;
}

export function useThrobber(
  frames: readonly string[],
  options: UseThrobberOptions = {},
): UseThrobberResult {
  const { speed = DEFAULT_SPEED, pulse = false } = options;
  if (frames.length === 0) {
    throw new Error('useThrobber: frames array must not be empty');
  }

  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const startRef = useRef(0);

  const clampedSpeed = clamp(speed, SPEED_MIN, SPEED_MAX);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, clampedSpeed);
    return () => clearInterval(id);
  }, [frames.length, clampedSpeed]);

  useEffect(() => {
    if (!pulse) {
      setOpacity(1);
      return;
    }
    let rafId: number;
    let lastUpdate = 0;
    const animate = (timestamp: number) => {
      if (startRef.current === 0) startRef.current = timestamp;
      // Throttle to ~30fps — visually smooth, half the renders of raw rAF
      if (timestamp - lastUpdate >= 32) {
        lastUpdate = timestamp;
        const elapsed = timestamp - startRef.current;
        setOpacity(0.65 + 0.35 * Math.sin(elapsed / 300));
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      startRef.current = 0;
    };
  }, [pulse]);

  return { frame: frames[index], opacity };
}
