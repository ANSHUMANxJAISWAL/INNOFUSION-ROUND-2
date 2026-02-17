import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition } from '../utils/animations';
import BottomNav from './shared/BottomNav';
import ProgressCircle from './shared/ProgressCircle';

export default function SafetyModeScreen({ setScreen }) {
    const { state } = useApp();
    const { lang, safetyScore, riskAssessment, safetyAlerts } = state;

    const alerts = [
        { id: 1, type: 'warning', icon: '⚠️', message: 'Heavy traffic on MG Road', time: '5 min ago' },
        { id: 2, type: 'info', icon: 'ℹ️', message: 'Well-lit route recommended', time: '10 min ago' },
        { id: 3, type: 'success', icon: '✅', message: 'Safe zone: Indiranagar', time: '15 min ago' },
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
                    <button onClick={() => setScreen('home')} className="text-textSecondary">
                        ← {T[lang].back}
                    </button>
                    <h2 className="text-lg font-bold text-textPrimary">🛡️ {T[lang].safetyMode}</h2>
                    <div className="w-8"></div>
                </div>

                {/* Overall Safety Score */}
                <div className="bg-surface border border-surfaceLight rounded-2xl p-6 mb-6 text-center">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].overallSafetyScore}</h3>
                    <ProgressCircle value={safetyScore} size={140} strokeWidth={10} color="#10B981" />
                    <p className="text-textSecondary text-sm mt-4">Your current route is safe</p>
                </div>

                {/* Risk Assessment */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].riskAssessment}</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-surface border border-surfaceLight rounded-2xl p-4 text-center">
                            <ProgressCircle value={riskAssessment.traffic} size={80} strokeWidth={6} color="#3B82F6" />
                            <p className="text-xs text-textSecondary mt-2">{T[lang].trafficRisk}</p>
                        </div>
                        <div className="bg-surface border border-surfaceLight rounded-2xl p-4 text-center">
                            <ProgressCircle value={riskAssessment.crime} size={80} strokeWidth={6} color="#10B981" />
                            <p className="text-xs text-textSecondary mt-2">{T[lang].crimeRisk}</p>
                        </div>
                        <div className="bg-surface border border-surfaceLight rounded-2xl p-4 text-center">
                            <ProgressCircle value={riskAssessment.lighting} size={80} strokeWidth={6} color="#F59E0B" />
                            <p className="text-xs text-textSecondary mt-2">{T[lang].lightingRisk}</p>
                        </div>
                    </div>
                </div>

                {/* Safety Alerts */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].safetyAlerts}</h3>
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                className={`bg-surface border rounded-2xl p-4 ${alert.type === 'warning'
                                    ? 'border-warning'
                                    : alert.type === 'success'
                                        ? 'border-success'
                                        : 'border-surfaceLight'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{alert.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-textPrimary font-medium mb-1">{alert.message}</p>
                                        <p className="text-xs text-textSecondary">{alert.time}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Quick SOS */}
                <motion.button
                    onClick={() => setScreen('sos')}
                    className="w-full py-4 bg-danger text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-danger/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-2xl">🚨</span>
                    {T[lang].quickSOS}
                </motion.button>

                {/* Community Incidents Map */}
                <div className="mt-6 bg-surface border border-surfaceLight rounded-2xl p-4">
                    <h3 className="text-sm font-bold text-textPrimary mb-3">{T[lang].communityIncidents}</h3>
                    <div className="h-40 bg-background rounded-lg flex items-center justify-center text-textSecondary">
                        🗺️ Safe Zones Map
                    </div>
                </div>
            </div>
            <BottomNav currentScreen="home" setScreen={setScreen} />
        </motion.div>
    );
}
