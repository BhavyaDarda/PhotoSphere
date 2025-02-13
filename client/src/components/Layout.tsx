import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";
import { useSoundEffects } from "@/lib/sounds";

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const [location] = useLocation();
  const { playSound } = useSoundEffects();

  // Play transition sound on route change
  useEffect(() => {
    playSound('transition');
  }, [location, playSound]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <CustomCursor />

      {/* Premium Gradient Background with Parallax */}
      <motion.div 
        className="fixed inset-0 bg-black"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{ opacity }}
        >
          {/* Primary Gradient */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, hsl(var(--primary) / 0.1) 0%, transparent 50%)
              `
            }}
          />

          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, 30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransitionVariants}
        >
          <Navbar />
          <main className="relative">
            {/* Animated Background Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                    style={{
                      top: `${20 * i}%`,
                      left: '-100%',
                      right: '-100%',
                    }}
                    animate={{
                      translateX: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 8,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Premium Glass Border */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
            </div>

            {/* Main Content */}
            <div className="relative">
              {children}
            </div>
          </main>
        </motion.div>
      </div>
    </div>
  );
}