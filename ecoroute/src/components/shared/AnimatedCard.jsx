import React from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../../utils/animations';

export default function AnimatedCard({ children, className = '', onClick }) {
    return (
        <motion.div
            className={`bg-white rounded-2xl shadow-sm ${className}`}
            {...cardHover}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
