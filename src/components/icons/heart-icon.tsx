'use client';

import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

const HeartIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", active, ...props },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      if (!scope.current) return;
      
      // Heartbeat pulse with fill reveal
      animate(
        ".heart",
        { 
          scale: [1, 1.15, 1, 1.25, 1],
          fillOpacity: [0, 1]
        },
        { duration: 0.6, ease: "easeOut" },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      if (!scope.current) return;
      animate(".heart", { scale: 1, fillOpacity: 0 }, { duration: 0.2, ease: "easeOut" });
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
        onHoverStart={start}
        onHoverEnd={stop}
        className={`inline-flex items-center justify-center ${className}`}
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
          className="cursor-pointer"
          style={{ overflow: "visible" }}
        >
          <motion.path
            className="heart"
            style={{ transformOrigin: "50% 50%" }}
            fill={color}
            fillOpacity={0}
            d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
          />
        </svg>
      </motion.div>
    );
  },
);

HeartIcon.displayName = "HeartIcon";
export default HeartIcon;
