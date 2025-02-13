import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from "@/lib/sounds";

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function GlowingButton({ children, ...props }: GlowingButtonProps) {
  const { playSound } = useSoundEffects();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
      onHoverStart={() => playSound('hover')}
      onTap={() => playSound('click')}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-lg bg-primary/30 blur-lg"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Button
        {...props}
        className="relative px-8 py-4 bg-black border border-primary text-primary
          hover:bg-primary/10 transition-all duration-500 group overflow-hidden
          backdrop-blur-sm"
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100
          bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0
          transition-opacity animate-shimmer" />

        {/* Text with Gradient */}
        <span className="relative z-10 font-montserrat group-hover:text-gradient
          transition-all duration-500">
          {children}
        </span>

        {/* Border Gradient */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
          transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, 
              hsl(var(--primary)) 0%, 
              transparent 40%,
              transparent 60%,
              hsl(var(--primary)) 100%
            )`,
            margin: "-1px",
            zIndex: -1,
          }}
        />
      </Button>
    </motion.div>
  );
}