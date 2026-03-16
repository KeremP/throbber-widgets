import React from 'react';
import { ThrobberBase } from './ThrobberBase';
import type { ThrobberProps } from './types';

export function createThrobber(
  displayName: string,
  frames: readonly string[],
): React.FC<ThrobberProps> {
  const Component: React.FC<ThrobberProps> = (props) => (
    <ThrobberBase frames={frames} {...props} />
  );
  Component.displayName = displayName;
  return Component;
}
