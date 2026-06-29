'use client';

import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

const RightChevron = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", active, ...props },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      if (!scope.current) return;
      await animate(
        ".chevron",
        { x: [0, 6, 0] },
        { duration: 0.8, ease: "easeInOut" },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      if (!scope.current) return;
      animate(".chevron", { x: 0 }, { duration: 0.2, ease: "easeInOut" });
    }, [animate, scope]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    useEffect(() => {
      if (active) {
        start();
      } else {
        stop();
      }
    }, [active, start, stop]);

    return (
      <motion.div
        ref={scope}
        className={className}
        onHoverStart={start}
        onHoverEnd={stop}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chevron cursor-pointer"
        >
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </motion.div>
    );
  },
);

RightChevron.displayName = "RightChevron";
export default RightChevron;
