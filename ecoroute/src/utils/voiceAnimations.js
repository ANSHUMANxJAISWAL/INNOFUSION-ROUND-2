// Voice visualizer animation variants for framer-motion
export const voiceVisualizerVariants = {
    idle: {
        scale: 1,
        opacity: 0.8,
    },
    listening: {
        scale: [1, 1.05, 1],
        opacity: 1,
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
    processing: {
        scale: [1, 1.02, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
    speaking: {
        scale: [1, 1.08, 1],
        opacity: 1,
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export const waveBarVariants = {
    idle: {
        scaleY: 0.3,
        opacity: 0.5,
    },
    listening: (index) => ({
        scaleY: [0.3, 1.5, 0.3],
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
        },
    }),
    processing: {
        scaleY: 0.5,
        opacity: 0.7,
        transition: {
            duration: 0.3,
        },
    },
    speaking: (index) => ({
        scaleY: [0.5, 1.8, 0.5],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.08,
        },
    }),
};

export const micButtonVariants = {
    idle: {
        scale: 1,
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
    },
    hover: {
        scale: 1.1,
        boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
        transition: {
            duration: 0.2,
        },
    },
    tap: {
        scale: 0.95,
    },
    active: {
        scale: 1.05,
        boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.4)",
            "0 0 50px rgba(59, 130, 246, 0.8)",
            "0 0 20px rgba(59, 130, 246, 0.4)",
        ],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export const assistantMessageVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

export const actionButtonVariants = {
    idle: {
        scale: 1,
        opacity: 0.9,
    },
    hover: {
        scale: 1.05,
        opacity: 1,
        boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
        transition: {
            duration: 0.2,
        },
    },
    tap: {
        scale: 0.98,
    },
};
