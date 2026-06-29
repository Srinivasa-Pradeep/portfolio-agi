/**
 * @fileOverview Centralized types for handcrafted animated icons.
 */

export interface AnimatedIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  active?: boolean;
}

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export type IconEasing = 
  | "linear" 
  | "easeIn" 
  | "easeOut" 
  | "easeInOut" 
  | "circIn" 
  | "circOut" 
  | "circInOut" 
  | "backIn" 
  | "backOut" 
  | "backInOut" 
  | "anticipate";

/**
 * Utility to scale stroke width based on viewbox vs intended size.
 */
export const scaledStrokeWidth = (stroke: number, viewboxSize: number) => {
  return (stroke * 24) / viewboxSize;
};
