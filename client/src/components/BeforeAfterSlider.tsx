import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - containerRect.left) / containerRect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleTouchMove = (e: TouchEvent) => handleMove(e);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg neo-effect">
      {title && (
        <div className="absolute top-4 left-4 z-20 glass-effect px-4 py-2 rounded-full">
          <h3 className="text-sm font-montserrat text-primary">{title}</h3>
        </div>
      )}
      
      <div
        ref={containerRef}
        className="relative aspect-video cursor-col-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img
            src={beforeImage}
            alt="Before"
            className="w-full h-full object-cover"
          />
        </div>

        {/* After Image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={afterImage}
            alt="After"
            className="w-full h-full object-cover"
            style={{ width: `${100 / (sliderPosition / 100)}%` }}
          />
        </div>

        {/* Slider Handle */}
        <motion.div
          className="absolute top-0 bottom-0"
          style={{ left: `${sliderPosition}%` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-full bg-primary absolute left-1/2 -translate-x-1/2 blur-sm" />
            <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-lg border-2 border-primary flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
