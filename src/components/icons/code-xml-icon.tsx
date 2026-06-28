'use client';

import { forwardRef, useImperativeHandle, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

export interface CodeXmlIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  active?: boolean;
}

export interface CodeXmlIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const CodeXmlIcon = forwardRef<CodeXmlIconHandle, CodeXmlIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", active },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      if (!scope.current) return;
      animate(".left-bracket", { x: -3 }, { duration: 0.3, ease: "easeOut" });
      animate(".right-bracket", { x: 3 }, { duration: 0.3, ease: "easeOut" });
      animate(
        ".slash",
        { scale: 1.1, opacity: 0.7 },
        { duration: 0.3, ease: "easeOut" },
      );
    };

    const stop = () => {
      if (!scope.current) return;
      animate(".left-bracket", { x: 0 }, { duration: 0.2, ease: "easeInOut" });
      animate(".right-bracket", { x: 0 }, { duration: 0.2, ease: "easeInOut" });
      animate(
        ".slash",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

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
        <motion.path className="right-bracket" d="m18 16 4-4-4-4" />
        <motion.path className="left-bracket" d="m6 8-4 4 4 4" />
        <motion.path
          className="slash"
          style={{ transformOrigin: "12px 12px" }}
          d="m14.5 4-5 16"
        />
      </motion.svg>
    );
  },
);

CodeXmlIcon.displayName = "CodeXmlIcon";

export default CodeXmlIcon;
