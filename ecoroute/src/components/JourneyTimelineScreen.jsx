import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { formatDuration } from '../utils/calculations';
import StatusBadge from './shared/StatusBadge';
import BottomNav from './shared/BottomNav';
import { pageVariants, pageTransition } from '../utils/animations';

export default function JourneyTimelineScreen({ setScreen }) {
    const { state } = useApp();
    const { lang } = state;

    const [journeys] = useState([
        {
            id: 1,
            title: 'Leave for Work',
            time: '8:20 AM',
            duration: 25,
            status: 'active',
            icon: '🚗',
            color: 'success',
            recommendation: 'Traffic is light on I-95. Recommended route active.',
        },
        {
            id: 2,
            title: 'Client Meeting',
            time: '10:30 AM',
            duration: 15,
            status: 'upcoming',
            icon: '🚌',
            color: 'warning',
            recommendation: 'Transit line B delayed by 4 mins. Consider walking to 5th Ave station.',
            alert: 'TIGHT WINDOW',
        },
        {
            id: 3,
            title: 'Lunch Break',
            time: '12:30 PM',
            duration: 10,
            status: 'upcoming',
            icon: '🚶',
            color: 'textSecondary',
        },
    ]);

    const periodSummaries = [
        {
            period: 'Morning',
            duration: 45,
            stops: 3,
            transfers: 2,
            mode: 'Mix mode',
            icon: '☀️',
        },
        {
            period: 'Afternoon',
            duration: 12,
            mode: 'Direct route',
            icon: '🌤️',
        },
    ];

    return (
        <motion.div
            className="min-h-screen bg-background text-textPrimary pb-32"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setScreen('home')}
                        className="text-textSecondary"
                    >
                        ← {T[lang].back}
                    </button>
                    <h2 className="text-lg font-bold text-textPrimary">{T[lang].journeyTimeline}</h2>
                    <div className="w-8"></div>
                </div>

                {/* Greeting & Stats */}
                <div className="mb-6">
                    <p className="text-textSecondary text-sm mb-2">Good morning, Anaya</p>
                    <h1 className="text-3xl font-bold text-textPrimary mb-4">Today's Journey</h1>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">45</div>
                                    <div className="text-xs text-textSecondary">MIN SAVED</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optimize My Day Button */}
                <motion.button
                    className="w-full py-3 bg-primary text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 mb-6"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span>✨</span>
                    Optimize My Day
                    <span className="ml-auto bg-white/20 px-2 py-0.5 rounded text-xs">AI ACTIVE</span>
                </motion.button>

                {/* Journey Cards */}
                <div className="space-y-4 mb-8">
                    {journeys.map((journey, index) => (
                        <div key={journey.id} className="relative">
                            {/* Timeline connector */}
                            {index < journeys.length - 1 && (
                                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-surfaceLight -mb-4"></div>
                            )}

                            <div className="flex gap-4">
                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 z-10 ${journey.status === 'active'
                                        ? 'bg-success border-success'
                                        : journey.color === 'warning'
                                            ? 'bg-warning border-warning'
                                            : 'bg-surface border-surfaceLight'
                                        }`}
                                >
                                    {journey.icon}
                                </div>

                                {/* Card */}
                                <motion.div
                                    className={`flex-1 p-4 rounded-2xl border-2 ${journey.status === 'active'
                                        ? 'bg-success/10 border-success'
                                        : journey.alert
                                            ? 'bg-warning/10 border-warning'
                                            : 'bg-surface border-surfaceLight'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-bold text-textPrimary">{journey.title}</h3>
                                        {journey.status === 'active' ? (
                                            <span className="text-xs font-semibold text-success uppercase">ON TIME</span>
                                        ) : journey.alert ? (
                                            <span className="text-xs font-semibold text-warning uppercase">{journey.alert}</span>
                                        ) : (
                                            <span className="text-xs font-semibold text-textSecondary uppercase">NOW</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 mb-2 text-sm text-textSecondary">
                                        <span className="flex items-center gap-1">
                                            🕐 {journey.time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            ⏱️ {journey.duration}m
                                        </span>
                                    </div>

                                    {journey.recommendation && (
                                        <p className="text-xs text-textSecondary leading-relaxed">
                                            {journey.recommendation}
                                        </p>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Period Summaries */}
                <div>
                    <h3 className="text-textSecondary text-xs uppercase mb-3 font-semibold">
                        Period Summaries
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {periodSummaries.map((summary) => (
                            <div
                                key={summary.period}
                                className="bg-surface border border-surfaceLight rounded-2xl p-4"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-textPrimary">{summary.period}</h4>
                                    <span className="text-2xl">{summary.icon}</span>
                                </div>
                                <div className="text-3xl font-bold text-textPrimary mb-1">{summary.duration}m</div>
                                <div className="text-xs text-textSecondary">{T[lang].total}</div>
                                <div className="text-xs text-textSecondary mt-2">
                                    {summary.stops && `${summary.stops} stops • ${summary.transfers} transfers • `}
                                    {summary.mode}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <BottomNav currentScreen="home" setScreen={setScreen} />
        </motion.div>
    );
}
