import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition } from '../utils/animations';
import BottomNav from './shared/BottomNav';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnergyModeScreen({ setScreen }) {
    const { state, dispatch } = useApp();
    const { lang, chargingPlan } = state;

    const chargingData = [
        { time: '22:00', intensity: 30, carbon: 20 },
        { time: '00:00', intensity: 60, carbon: 15 },
        { time: '02:00', intensity: 80, carbon: 10 },
        { time: '04:00', intensity: 70, carbon: 12 },
        { time: '06:00', intensity: 40, carbon: 25 },
    ];

    const gridLoadData = [
        { hour: '22', load: 45 },
        { hour: '00', load: 30 },
        { hour: '02', load: 20 },
        { hour: '04', load: 25 },
        { hour: '06', load: 50 },
    ];

    const updateChargingPlan = (key, value) => {
        dispatch({
            type: 'SET_CHARGING_PLAN',
            payload: { [key]: value },
        });
    };

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
                    <h2 className="text-lg font-bold text-textPrimary">⚡ {T[lang].energyMode}</h2>
                    <div className="w-8"></div>
                </div>

                {/* EV Charging Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-textPrimary mb-2">{T[lang].evCharging}</h1>
                    <p className="text-textSecondary text-sm">{T[lang].carbonAwareScheduling}</p>
                </div>

                {/* Current vs Optimized */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4">
                        <div className="text-xs text-textSecondary uppercase mb-2">{T[lang].currentPlan}</div>
                        <div className="text-3xl font-bold text-textPrimary mb-1">8.5</div>
                        <div className="text-xs text-textSecondary">{T[lang].kwh}</div>
                        <div className="text-xs text-warning mt-2">High carbon</div>
                    </div>
                    <div className="bg-primary/10 border border-primary rounded-2xl p-4">
                        <div className="text-xs text-primary uppercase mb-2">{T[lang].optimizedPlan}</div>
                        <div className="text-3xl font-bold text-primary mb-1">6.2</div>
                        <div className="text-xs text-textSecondary">{T[lang].kwh}</div>
                        <div className="text-xs text-success mt-2">27% less carbon</div>
                    </div>
                </div>

                {/* Charging Intensity Chart */}
                <div className="bg-surface border border-surfaceLight rounded-2xl p-4 mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].chargingIntensity}</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={chargingData}>
                            <defs>
                                <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="time" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                                labelStyle={{ color: '#F1F5F9' }}
                            />
                            <Area type="monotone" dataKey="intensity" stroke="#3B82F6" fillOpacity={1} fill="url(#colorIntensity)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Grid Load */}
                <div className="bg-surface border border-surfaceLight rounded-2xl p-4 mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].gridLoad}</h3>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={gridLoadData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="hour" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                                labelStyle={{ color: '#F1F5F9' }}
                            />
                            <Bar dataKey="load" fill="#10B981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Set Charging Plan */}
                <div className="bg-surface border border-surfaceLight rounded-2xl p-4 mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].setChargingPlan}</h3>

                    {/* Time Range */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="text-xs text-textSecondary uppercase mb-2 block">{T[lang].startTime}</label>
                            <input
                                type="time"
                                value={chargingPlan.startTime}
                                onChange={(e) => updateChargingPlan('startTime', e.target.value)}
                                className="w-full bg-background border border-surfaceLight rounded-lg px-3 py-2 text-textPrimary"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-textSecondary uppercase mb-2 block">{T[lang].endTime}</label>
                            <input
                                type="time"
                                value={chargingPlan.endTime}
                                onChange={(e) => updateChargingPlan('endTime', e.target.value)}
                                className="w-full bg-background border border-surfaceLight rounded-lg px-3 py-2 text-textPrimary"
                            />
                        </div>
                    </div>

                    {/* Intensity */}
                    <div className="mb-4">
                        <label className="text-xs text-textSecondary uppercase mb-2 block">{T[lang].intensity}</label>
                        <div className="flex gap-2">
                            {['low', 'medium', 'high'].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => updateChargingPlan('intensity', level)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold ${chargingPlan.intensity === level
                                        ? 'bg-primary text-white'
                                        : 'bg-background text-textSecondary border border-surfaceLight'
                                        }`}
                                >
                                    {T[lang][level]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Carbon Aware Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-textPrimary">{T[lang].carbonAwareScheduling}</span>
                        <button
                            onClick={() => updateChargingPlan('carbonAware', !chargingPlan.carbonAware)}
                            className={`w-12 h-6 rounded-full transition-colors ${chargingPlan.carbonAware ? 'bg-success' : 'bg-surfaceLight'
                                }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${chargingPlan.carbonAware ? 'ml-6' : 'ml-0.5'
                                    }`}
                            ></div>
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <motion.button
                    className="w-full py-3 bg-primary text-white rounded-2xl font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {T[lang].save} {T[lang].chargingPlan}
                </motion.button>
            </div>
            <BottomNav currentScreen="home" setScreen={setScreen} />
        </motion.div>
    );
}
