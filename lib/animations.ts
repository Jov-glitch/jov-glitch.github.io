// GSAP and Framer Motion animation utilities for Neo-Brutalista portfolio

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const popInVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "circOut" as const,
    },
  },
};

export const buttonHoverVariants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -2,
    boxShadow: "12px 12px 0px rgba(0, 0, 0, 0.95)",
    transition: {
      duration: 0.12,
      ease: "easeOut" as const,
    },
  },
  tap: {
    y: 1,
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.6)",
    transition: {
      duration: 0.05,
      ease: "easeIn" as const,
    },
  },
};

export const cardHoverVariants = {
  initial: {
    y: 0,
    boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.8)",
  },
  hover: {
    y: -4,
    boxShadow: "12px 12px 0px rgba(0, 0, 0, 0.95)",
    rotate: 1,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
};

export const rotateSlightVariants = {
  hidden: { opacity: 0, rotate: -2 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

// GSAP ScrollTrigger configuration
export const gsapScrollTriggerDefaults = {
  trigger: undefined,
  start: "top 80%",
  end: "top 20%",
  toggleActions: "play none none reverse",
  markers: false,
};

// Parallax configuration
export const parallaxConfig = {
  speed: 1.2, // 1.2x scroll speed
  distance: 50, // pixels to move
};

export const transitionConfig = {
  fast: { duration: 0.1 },
  base: { duration: 0.2 },
  slow: { duration: 0.6 },
};
