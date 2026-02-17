import React from 'react';
import { motion } from 'framer-motion';

export default function StatusBadge({ status, size = 'md' }) {
    const configs = {
        active: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            icon: '●',
            label: status || 'Active',
        },
        upcoming: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            icon: '○',
            label: status || 'Upcoming',
        },
        completed: {
            bg: 'bg-gray-100',
            text: 'text-gray-700',
            icon: '✓',
            label: status || 'Completed',
        },
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    const statusType = typeof status === 'string' && configs[status.toLowerCase()]
        ? status.toLowerCase()
        : 'active';

    const config = configs[statusType];

    return (
        <motion.span
            className={`inline-flex items-center gap-1 rounded-full font-semibold ${config.bg} ${config.text} ${sizeClasses[size]}`}
            whileHover={{ scale: 1.05 }}
        >
            <span>{config.icon}</span>
            <span>{config.label}</span>
        </motion.span>
    );
}
