import React from 'react';
import { motion } from 'framer-motion';
import { voiceVisualizerVariants, waveBarVariants } from '../../utils/voiceAnimations';

export default function VoiceVisualizer({ state = 'idle' }) {
    // Create 5 wave bars
    const waveBars = [0, 1, 2, 3, 4];

    return (
        <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <motion.div
                className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl"
                variants={voiceVisualizerVariants}
                animate={state}
            />

            {/* Main visualizer circle */}
            <motion.div
                className="relative w-56 h-56 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center shadow-glow-lg"
                variants={voiceVisualizerVariants}
                animate={state}
            >
                {/* Inner circle */}
                <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-primary/60 to-primary/20" />

                {/* Wave bars container */}
                <div className="relative flex items-center justify-center gap-2 z-10">
                    {waveBars.map((index) => (
                        <motion.div
                            key={index}
                            className="w-1.5 h-16 bg-white/90 rounded-full origin-center"
                            custom={index}
                            variants={waveBarVariants}
                            animate={state}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Pulse rings for listening state */}
            {state === 'listening' && (
                <>
                    <motion.div
                        className="absolute w-64 h-64 rounded-full border-2 border-primary/30"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                    <motion.div
                        className="absolute w-64 h-64 rounded-full border-2 border-primary/30"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 1,
                        }}
                    />
                </>
            )}
        </div>
    );
}
