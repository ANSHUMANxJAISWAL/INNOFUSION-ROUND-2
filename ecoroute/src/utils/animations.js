/**
 * Framer Motion animation presets for consistent animations across the app
 */

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
};

export const slideUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.3 },
};

export const slideInFromRight = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.3 },
};

export const slideInFromLeft = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.3 },
};

export const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3 },
};

export const cardHover = {
    whileHover: {
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 }
    },
    whileTap: { scale: 0.98 },
};

export const buttonHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
};

export const pulseAnimation = {
    animate: {
        scale: [1, 1.1, 1],
    },
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

// Page transition variants
export const pageVariants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: 20,
    },
};

export const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
};
