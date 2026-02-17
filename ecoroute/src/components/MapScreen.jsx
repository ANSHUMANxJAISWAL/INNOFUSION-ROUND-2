import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition } from '../utils/animations';
import BottomNav from './shared/BottomNav';

export default function MapScreen({ setScreen }) {
    const { state } = useApp();
    const { lang } = state;

    const [activeFilters, setActiveFilters] = useState(['traffic']);
    const [aqi] = useState(84);

    const filters = [
        { id: 'traffic', label: T[lang].trafficOverlay, icon: '⚡' },
        { id: 'safety', label: T[lang].safetyOverlay, icon: '🛡️' },
        { id: 'carbon', label: T[lang].carbonOverlay, icon: '🌿' },
    ];

    const quickActions = [
        { id: 'ev', label: 'EV Stations', icon: '⚡' },
        { id: 'bike', label: 'Bike Share', icon: '🚲' },
        { id: 'green', label: 'Green', icon: '🌿' },
    ];

    const toggleFilter = (filterId) => {
        if (activeFilters.includes(filterId)) {
            setActiveFilters(activeFilters.filter(f => f !== filterId));
        } else {
            setActiveFilters([...activeFilters, filterId]);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-background text-textPrimary pb-24"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Status Bar */}
            <div className="bg-surface px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-primary text-sm">📍 BANGALORE</span>
                    <span className="text-textPrimary font-bold">10:45 AM</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-info/20 px-2 py-1 rounded-lg">
                        <span className="text-info text-xs font-semibold">AQI 84</span>
                    </div>
                    <div className="text-sm text-textSecondary">
                        <span className="font-semibold">Anaya</span>
                        <br />
                        <span className="text-xs">Urban Planner •</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        👤
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative h-[calc(100vh-300px)] bg-surfaceLight">
                {/* Map Placeholder */}
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-6xl mb-4 text-primary">📍</div>
                        <div className="text-xl text-textPrimary font-bold">300 × 300</div>
                        <div className="text-textSecondary mt-2">BANGALORE CENTRAL</div>
                    </div>
                </div>

                {/* Map Engine Live Badge */}
                <div className="absolute top-4 left-4 bg-success/20 backdrop-blur px-3 py-2 rounded-lg">
                    <span className="text-success text-xs font-semibold">● MAP ENGINE LIVE</span>
                </div>

                {/* Location Search */}
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-surface/90 backdrop-blur rounded-2xl p-4 border border-surfaceLight">
                        <div className="flex items-center gap-3">
                            <span className="text-textSecondary text-xl">🔍</span>
                            <input
                                type="text"
                                placeholder="Where to next?"
                                className="flex-1 bg-transparent text-textPrimary outline-none border-none placeholder-textSecondary"
                            />
                            <button className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">🎯</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* SOS Button */}
                <button className="absolute bottom-28 right-4 w-16 h-16 bg-danger rounded-full flex items-center justify-center shadow-lg shadow-danger/50 animate-pulse-slow">
                    <span className="text-white text-2xl">🚨</span>
                </button>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-4 bg-surface">
                <div className="flex gap-3 mb-4 overflow-x-auto">
                    {quickActions.map((action) => (
                        <button
                            key={action.id}
                            className="flex items-center gap-2 px-4 py-2 bg-background border border-primary rounded-2xl text-primary font-semibold text-sm whitespace-nowrap"
                        >
                            <span>{action.icon}</span>
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Daily Impact */}
                <div className="bg-background border border-surfaceLight rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-textPrimary font-bold">Your Daily Impact</h3>
                        <span className="text-success text-2xl">🏆</span>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <div className="text-5xl font-bold text-success">87</div>
                        <div className="text-success font-bold mb-2">trees</div>
                    </div>
                    <div className="text-xs text-textSecondary mb-3">SAVED TODAY</div>
                    <div className="h-2 bg-surfaceLight rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-success to-primary"></div>
                    </div>

                    {/* SOS Emergency Button */}
                    <button
                        onClick={() => setScreen('sos')}
                        className="w-full mt-4 py-3 bg-danger text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                        <span className="text-xl">🚨</span>
                        SOS EMERGENCY
                    </button>
                </div>
            </div>

            {/* Bottom Nav */}
            <BottomNav currentScreen="map" setScreen={setScreen} />
        </motion.div>
    );
}
