'use client';

import { forwardRef, useImperativeHandle, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import type { AtSignIconHandle, AtSignIconProps } from "./at-sign-icon";

const CheckedIcon = forwardRef<AtSignIconHandle, AtSignIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", active },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      if (!scope.current) return;
      
      await animate(
        "svg",
        { scale: 1.1 },
        { duration: 0.1, ease: "easeInOut" },
      );
      
      if (!scope.current) return;

      await animate(
        ".check-icon",
        { pathLength: 0 },
        { duration: 0.1, ease: "easeInOut" },
      );
      
      if (!scope.current) return;

      await animate(
        ".check-icon",
        { pathLength: 1 },
        { duration: 0.4, ease: "easeInOut" },
      );

      if (!scope.current) return;

      await animate(
        "svg",
        { scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    };

    const stop = () => {
      if (!scope.current) return;
      animate("svg", { scale: 1 }, { duration: 0.2 });
      animate(".check-icon", { pathLength: 1 }, { duration: 0.2 });
    };

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
    }, [active]);

    const handleHoverStart = () => start();
    const handleHoverEnd = () => stop();

    return (
      <motion.div
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="inline-flex"
      >
        <motion.svg
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
        >
          <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <motion.path d="M9 12l2 2l4 -4" className="check-icon" initial={{ pathLength: 1 }} />
        </motion.svg>
      </motion.div>
    );
  },
);

CheckedIcon.displayName = "CheckedIcon";

export default CheckedIcon;