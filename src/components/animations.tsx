"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring, type Variants } from "framer-motion";
import { type ReactNode, useRef, useEffect, useState } from "react";

/* ===== VARIANT PRESETS ===== */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ===== TYPE ===== */

type AnimatedProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/* ===== BASIC ANIMATIONS ===== */

export function FadeInUp({ children, className, delay }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className, delay }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function FadeInLeft({ children, className, delay }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function FadeInRight({ children, className, delay }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className, delay }: AnimatedProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, className, delay }: AnimatedProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ===== STAGGER CONTAINERS ===== */

export function StaggerContainer({ children, className }: AnimatedProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainerSlow({ children, className }: AnimatedProps) {
  return (
    <motion.div
      variants={staggerContainerSlow}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: AnimatedProps) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

/* ===== ANIMATED COUNTER (REAL) ===== */

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className="counter-number">
      {prefix}
      {displayValue.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

/* ===== TEXT REVEAL (WORD BY WORD) ===== */

export function TextReveal({ children, className }: { children: string; className?: string }) {
  const words = children.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.03 } },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ===== LINE REVEAL ===== */

export function LineReveal({ className }: { className?: string }) {
  return (
    <motion.div
      className={`h-[2px] bg-gradient-to-r from-accent to-accent-dark ${className || ""}`}
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ===== PROGRESS BAR ANIMATED ===== */

export function ProgressBar({
  value,
  label,
  delay = 0,
}: {
  value: number;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-navy-700">{label}</span>
        <span className="text-sm font-bold text-accent">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-navy-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-dark"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ===== MARQUEE / TICKER ===== */

export function Marquee({
  children,
  className,
  speed = 30,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ===== MARQUEE REVERSE (scrolls right) ===== */

export function MarqueeReverse({
  children,
  className,
  speed = 30,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ===== FLOATING ELEMENT ===== */

export function FloatingElement({ children, className }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ===== PULSE GLOW ===== */

export function PulseGlow({ children, className }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(166, 133, 35, 0)",
          "0 0 0 12px rgba(166, 133, 35, 0.15)",
          "0 0 0 0 rgba(166, 133, 35, 0)",
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ===== PARALLAX SECTION ===== */

export function ParallaxText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScrollProgress(ref);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top / windowHeight);
      scrollYProgress.set(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, scrollYProgress]);

  return { scrollYProgress };
}

/* ===== HOVER SCALE CARD ===== */

export function HoverCard({ children, className }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ===== ANIMATED BLOB ===== */

export function AnimatedBlob({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className || ""}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "50% 60% 30% 60% / 30% 40% 70% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
