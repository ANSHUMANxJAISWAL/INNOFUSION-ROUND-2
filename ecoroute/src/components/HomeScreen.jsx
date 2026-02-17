import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition, staggerContainer, staggerItem } from '../utils/animations';
import ModeCard from './shared/ModeCard';
import BottomNav from './shared/BottomNav';

export default function HomeScreen({ setScreen }) {
    const { state, dispatch } = useApp();
    const { lang, fromLocation, toLocation } = state;

    const intelligentModes = [
        {
            id: 'time',
            icon: '🕐',
            title: T[lang].timeCalendarMode,
            description: T[lang].timeCalendarDesc,
            screen: 'journey-timeline',
        },
        {
            id: 'energy',
            icon: '⚡',
            title: T[lang].energyMode,
            description: T[lang].energyModeDesc,
            screen: 'energy',
        },
        {
            id: 'information',
            icon: 'ℹ️',
            title: T[lang].informationMode,
            description: T[lang].informationModeDesc,
            screen: 'map',
        },
        {
            id: 'carbon',
            icon: '🌿',
            title: T[lang].carbonMode,
            description: T[lang].carbonModeDesc,
            screen: 'dashboard',
        },
        {
            id: 'safety',
            icon: '🛡️',
            title: T[lang].safetyMode,
            description: T[lang].safetyModeDesc,
            screen: 'safety',
        },
        {
            id: 'planb',
            icon: '🔄',
            title: T[lang].planBMode,
            description: T[lang].planBModeDesc,
            screen: 'results',
        },
    ];

    const currentTime = new Date();
    const hour = currentTime.getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

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
                {/* Header with Savings */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg">
                        <span className="text-primary">₹</span>
                        <span className="text-textPrimary font-semibold">You saved ₹{state.stats.moneySaved} this month</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg border border-success text-success text-sm font-semibold">
                        🛡️ SAFETY-FIRST
                    </button>
                </div>

                {/* Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black text-textPrimary italic tracking-wider mb-2">
                        PATHIQUE
                    </h1>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest">
                        {T[lang].tagline}
                    </p>
                </div>

                {/* Location Inputs */}
                <div className="bg-surface rounded-2xl p-5 mb-6 border border-surfaceLight">
                    <div className="mb-4">
                        <label className="text-xs text-primary uppercase mb-2 block font-semibold">
                            {T[lang].from}
                        </label>
                        <div className="flex items-center gap-3">
                            <span className="text-primary text-xl">📍</span>
                            <input
                                type="text"
                                value={fromLocation}
                                onChange={(e) => dispatch({ type: 'SET_FROM_LOCATION', payload: e.target.value })}
                                className="flex-1 bg-transparent text-textPrimary text-lg font-medium outline-none border-none"
                            />
                            <button className="text-primary">
                                🎯
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-surfaceLight pt-4">
                        <label className="text-xs text-success uppercase mb-2 block font-semibold">
                            {T[lang].to}
                        </label>
                        <div className="flex items-center gap-3">
                            <span className="text-success text-xl">📍</span>
                            <input
                                type="text"
                                value={toLocation}
                                onChange={(e) => dispatch({ type: 'SET_TO_LOCATION', payload: e.target.value })}
                                placeholder="Where to?"
                                className="flex-1 bg-transparent text-textPrimary text-lg font-medium outline-none border-none placeholder-textSecondary"
                            />
                        </div>
                    </div>
                </div>

                {/* Greeting */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-textPrimary mb-1">
                            {greeting}, {state.user.name}
                        </h2>
                        <p className="text-textSecondary text-sm uppercase">
                            {state.user.role} • {state.user.location}
                        </p>
                    </div>
                    {state.user.avatar && (
                        <div className="flex-shrink-0">
                            <img
                                src={state.user.avatar}
                                alt={state.user.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                            />
                        </div>
                    )}
                </div>

                {/* Weather & Ready Info */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-textSecondary">
                        <span className="text-xl">{state.weather.icon}</span>
                        <span className="text-sm">{state.weather.time} | {state.weather.temperature} • {state.weather.condition}</span>
                    </div>
                    {state.weather.readyToWalk && (
                        <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">
                            ...Ready to walk? »
                        </button>
                    )}
                </div>

                {/* Trip Engine */}
                <div className="mb-6">
                    <p className="text-textSecondary text-xs italic mb-3">...TRIP ENGINE</p>
                    <motion.button
                        onClick={() => setScreen('planner')}
                        className="w-full py-4 bg-surface border-2 border-primary rounded-2xl text-primary font-bold text-lg flex items-center justify-center gap-2 shadow-glow"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                            borderColor: 'rgba(59, 130, 246, 0.8)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="text-2xl">✨</span>
                        TRIP OPTIMIZER
                    </motion.button>
                </div>

                {/* Map Preview */}
                <div className="mb-6 relative h-32 bg-surface rounded-2xl overflow-hidden border border-surfaceLight">
                    <div className="absolute top-3 left-3 bg-success/20 backdrop-blur px-3 py-1 rounded-lg">
                        <span className="text-success text-xs font-semibold">● MAP ENGINE LIVE</span>
                    </div>
                    <div className="w-full h-full flex items-center justify-center text-textSecondary">
                        🗺️ Map Preview
                    </div>
                    <button className="absolute bottom-3 right-3 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl">
                        🗺️
                    </button>
                </div>

                {/* Intelligent Modes */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <h3 className="text-textSecondary text-xs uppercase mb-3 font-semibold">
                        {T[lang].selectIntelligentMode}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {intelligentModes.map((mode) => (
                            <motion.div key={mode.id} variants={staggerItem}>
                                <ModeCard
                                    icon={mode.icon}
                                    title={mode.title.split(' ').slice(1).join(' ')}
                                    description={mode.description}
                                    onClick={() => setScreen(mode.screen)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav currentScreen="home" setScreen={setScreen} />
        </motion.div>
    );
}
