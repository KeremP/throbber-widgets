// Types
export type { ThrobberProps } from './types';
export type { UseThrobberOptions, UseThrobberResult } from './useThrobber';
export type { ThrobberBaseProps } from './ThrobberBase';

// Hook (for any React context — web, Ink, etc.)
export { useThrobber } from './useThrobber';

// Base component + factory (for custom frame sets)
export { ThrobberBase } from './ThrobberBase';
export { createThrobber } from './createThrobber';

// Raw frame arrays (framework-agnostic — use anywhere)
export * from './frames';

// All 65 throbber components
export * from './throbbers';
