import React from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../../utils/animations';

export default function ModeCard({ icon, title, description, onClick, selected = false }) {
    return (
        <motion.button
            className={`p-6 rounded-2xl border-2 transition-all text-left ${selected
                    ? 'bg-accent border-accent text-white'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
            {...cardHover}
            onClick={onClick}
        >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className={`text-sm ${selected ? 'text-white/90' : 'text-gray-500'}`}>
                {description}
            </p>
        </motion.button>
    );
}
