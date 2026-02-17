import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressCircle({ value, size = 120, strokeWidth = 8, label, color = '#52B788' }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
                {/* Center text */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-2xl font-bold fill-gray-800"
                    transform={`rotate(90 ${size / 2} ${size / 2})`}
                >
                    {value}
                </text>
            </svg>
            {label && (
                <p className="text-sm text-gray-600 mt-2 font-medium">{label}</p>
            )}
        </div>
    );
}
