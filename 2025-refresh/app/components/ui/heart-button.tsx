"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

type HeartButtonProps = {
  maxClicks?: number;
  initialCount?: number;
  onChange?: (count: number) => void;
  className?: string;
};

const variants = {
  heart: {
    initial: { scale: 1 },
    tapActive: { scale: 0.8 },
    tapCompleted: { scale: 1 },
  },
  glow: {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: [1, 1.5], opacity: [0.8, 0] },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  pulse: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: [1.2, 1.8, 1.2], opacity: [0, 0.3, 0] },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const createParticleAnimation = (index: number) => ({
  initial: { x: 0, y: 0, scale: 0, opacity: 0 },
  animate: {
    x: `calc(${Math.cos((index * Math.PI) / 3) * 30}px)`,
    y: `calc(${Math.sin((index * Math.PI) / 3) * 30}px)`,
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
  },
  transition: { duration: 0.8, delay: index * 0.05, ease: "easeOut" },
});

const HeartButton = React.forwardRef<HTMLDivElement, HeartButtonProps>(
  (props, ref) => {
    const {
      maxClicks = 5,
      initialCount = 0,
      onChange,
      className,
      ...restProps
    } = props;

    const [clickCount, setClickCount] = React.useState(initialCount);

    // Generate random spectrometer-like animation keyframes once on mount
    const [randomFillKeyframes] = React.useState(() => {
      const frames = [];
      for (let i = 0; i < 15; i++) {
        // Random fill between 5% and 50% for organic feel
        const randomFill = 100 - (Math.random() * 45 + 5);
        frames.push(`inset(${randomFill}% 0 0 0)`);
      }
      // End at empty
      frames.push("inset(100% 0 0 0)");
      return frames;
    });

    const fillPercentage = Math.min(100, (clickCount / maxClicks) * 100);
    const isActive = clickCount > 0;
    const isCompleted = clickCount >= maxClicks;
    const sizeMultiplier = 1 + clickCount * 0.01;

    const handleClick = () => {
      if (clickCount < maxClicks) {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        onChange?.(newCount);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("flex justify-center items-center relative", className)}
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={handleClick}
          aria-pressed={isActive}
          aria-label={isCompleted ? "Maximum hearts given" : "Give heart"}
          className="relative cursor-pointer hover:bg-zinc-800/50 transition-colors"
          {...restProps}
        >
          <motion.div
            initial="initial"
            animate={{ scale: isActive ? sizeMultiplier : 1 }}
            whileTap={isCompleted ? "tapCompleted" : "tapActive"}
            variants={variants.heart}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative"
          >
            <Heart className="opacity-60" size={24} aria-hidden="true" />

            {/* Pulsing hint animation when inactive */}
            {!isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{
                    clipPath: randomFillKeyframes,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "linear",
                  }}
                  className="absolute inset-0"
                >
                  <Heart
                    className="text-red-500 fill-red-500 opacity-80"
                    size={24}
                    aria-hidden="true"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Actual fill based on clicks */}
            {isActive && (
              <Heart
                className="absolute inset-0 text-red-500 fill-red-500 transition-all duration-300"
                size={24}
                aria-hidden="true"
                style={{ clipPath: `inset(${100 - fillPercentage}% 0 0 0)` }}
              />
            )}

            <AnimatePresence>
              {isCompleted && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)",
                    }}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    variants={variants.pulse}
                  />

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: "0 0 10px 2px rgba(239,68,68,0.6)" }}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    variants={variants.glow}
                  />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </Button>

        <AnimatePresence>
          {isCompleted && (
            <motion.div className="absolute inset-0 pointer-events-none flex justify-center items-center">
              {Array.from({ length: 6 }).map((_, i) => {
                const particle = createParticleAnimation(i);

                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-red-500"
                    initial={particle.initial}
                    animate={particle.animate}
                    transition={{
                      ...particle.transition,
                      ease: ["easeInOut"] // Fix: ensure 'ease' is acceptable type for framer-motion
                    }}
                    exit={{ opacity: 0 }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HeartButton.displayName = "HeartButton";

export { HeartButton };

