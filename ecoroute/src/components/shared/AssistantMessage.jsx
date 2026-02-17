import React from 'react';
import { motion } from 'framer-motion';
import { assistantMessageVariants } from '../../utils/voiceAnimations';

export default function AssistantMessage({ message, avatar }) {
    return (
        <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 border border-surfaceLight"
            variants={assistantMessageVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-start gap-3">
                {/* Avatar */}
                {avatar && (
                    <div className="flex-shrink-0">
                        <img
                            src={avatar}
                            alt="Assistant"
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                        />
                    </div>
                )}

                {/* Message content */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                            Assistant
                        </span>
                    </div>
                    <p className="text-textPrimary text-sm leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
