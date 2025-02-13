import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('[role="button"]') !== null
      );
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.5,
        stiffness: 400
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/30"
        animate={{
          scale: isHovering ? [1, 1.2, 1] : 1
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
