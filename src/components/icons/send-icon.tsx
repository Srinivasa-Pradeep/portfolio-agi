'use client';

import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

export interface SendIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  active?: boolean;
}

export interface SendIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const SendIcon = forwardRef<SendIconHandle, SendIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", active },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      if (!scope.current) return;
      
      // Launch phase
      await animate(
        ".send-icon-inner",
        {
          x: [0, 24],
          y: [0, -24],
          opacity: [1, 0],
        },
        { duration: 0.25, ease: "easeIn" },
      );

      if (!scope.current) return;
      
      // Instant reposition for return
      await animate(".send-icon-inner", { x: -24, y: 24 }, { duration: 0 });

      if (!scope.current) return;
      
      // Return phase
      await animate(
        ".send-icon-inner",
        {
          x: [-24, 0],
          y: [24, 0],
          opacity: [0, 1],
        },
        { duration: 0.25, ease: "easeOut" },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      if (!scope.current) return;
      animate(".send-icon-inner", { x: 0, y: 0, opacity: 1 }, { duration: 0.2 });
    }, [animate, scope]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    // Trigger animation when row is selected/active
    useEffect(() => {
      if (active) {
        start();
      } else {
        stop();
      }
    }, [active, start, stop]);

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g className="send-icon-inner" style={{ transformOrigin: "center" }}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 14l11 -11" />
          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
        </motion.g>
      </motion.svg>
    );
  },
);

SendIcon.displayName = "SendIcon";
export default SendIcon;
