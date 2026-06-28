'use client';

import { forwardRef, useImperativeHandle, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

export interface AtSignIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  active?: boolean;
}

export interface AtSignIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const AtSignIcon = forwardRef<AtSignIconHandle, AtSignIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", active },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      if (!scope.current) return;
      
      // Reset state
      animate(".draw", { pathLength: 0, opacity: 0 }, { duration: 0 });

      // Outer ring
      await animate(
        ".outer",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.45, ease: "easeOut" },
      );

      if (!scope.current) return;

      // The @ path
      await animate(
        ".path",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.6, ease: "easeOut" },
      );

      if (!scope.current) return;

      // Inner circle
      animate(
        ".inner",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.3, ease: "easeOut" },
      );
    };

    const stop = () => {
      if (!scope.current) return;
      // Fade back to static state
      animate(".draw", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    // Reactive trigger for parent row interaction (keyboard or hover)
    useEffect(() => {
      if (active) {
        start();
      } else {
        stop();
      }
    }, [active]);

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <motion.circle
          className="draw inner"
          cx="12"
          cy="12"
          r="4"
          initial={{ pathLength: 1, opacity: 1 }}
        />
        <motion.path
          className="draw path"
          d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
          initial={{ pathLength: 1, opacity: 1 }}
        />
        <motion.circle
          className="draw outer"
          cx="12"
          cy="12"
          r="10"
          initial={{ pathLength: 1, opacity: 1 }}
        />
      </motion.svg>
    );
  },
);

AtSignIcon.displayName = "AtSignIcon";

export default AtSignIcon;
