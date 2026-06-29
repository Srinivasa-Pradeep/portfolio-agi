'use client';

import { forwardRef, useImperativeHandle, useEffect, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

const BatteryChargingIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2.5, className = "", active, ...props },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const isAnimating = useRef(false);

    const start = useCallback(async () => {
      if (!scope.current || isAnimating.current) return;
      isAnimating.current = true;

      await animate(
        ".battery-bar-1",
        { opacity: 1 },
        { duration: 0.15, ease: "easeOut" }
      );

      if (!scope.current) return;

      await animate(
        ".battery-bar-2",
        { opacity: 1 },
        { duration: 0.15, ease: "easeOut" }
      );

      if (!scope.current) return;

      await animate(
        ".battery-bar-3",
        { opacity: 1 },
        { duration: 0.15, ease: "easeOut" }
      );

      if (!scope.current) return;

      await animate(
        ".battery-bar-4",
        { opacity: 1 },
        { duration: 0.15, ease: "easeOut" }
      );
      
      isAnimating.current = false;
    }, [animate, scope]);

    const stop = useCallback(async () => {
      if (!scope.current) return;
      isAnimating.current = false;
      
      await animate(
        ".battery-bar-1, .battery-bar-2, .battery-bar-3, .battery-bar-4",
        { opacity: 0 },
        { duration: 0.2, ease: "easeInOut" }
      );
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
          viewBox="0 0 48 48"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            initial={{ opacity: 0 }}
            className="battery-bar-1"
            d="M10 31V17"
          />
          <motion.path
            initial={{ opacity: 0 }}
            className="battery-bar-2"
            d="M17 31V17"
          />
          <motion.path
            initial={{ opacity: 0 }}
            className="battery-bar-3"
            d="M24 31V17"
          />
          <motion.path
            initial={{ opacity: 0 }}
            className="battery-bar-4"
            d="M31 31V17"
          />

          <path d="M46 20V28" />
          <path d="M37 10H8C5.2386 10 3 12.2386 3 15V33C3 35.7614 5.2386 38 8 38H37C39.7614 38 42 35.7614 42 33V15C42 12.2386 39.7614 10 37 10Z" />
        </svg>
      </motion.div>
    );
  },
);

BatteryChargingIcon.displayName = "BatteryChargingIcon";
export default BatteryChargingIcon;
