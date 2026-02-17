import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition } from '../utils/animations';
import BottomNav from './shared/BottomNav';

export default function SettingsScreen({ setScreen }) {
    const { state, dispatch } = useApp();
    const { lang, persona, safeMode, preferences, stats } = state;

    const getPersonaLabel = () => {
        if (persona === 'student') return T[lang].studentMode;
        if (persona === 'adult') return T[lang].adultMode;
        if (persona === 'senior') return T[lang].seniorMode;
        return '';
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
                    <h2 className="text-lg font-bold text-textPrimary">⚙️ {T[lang].settings}</h2>
                    <div className="w-8"></div>
                </div>

                {/* User Profile */}
                <div className="bg-surface border border-surfaceLight rounded-2xl p-6 mb-6 text-center">
                    <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                        👤
                    </div>
                    <h3 className="text-xl font-bold text-textPrimary mb-1">Anaya</h3>
                    <p className="text-textSecondary text-sm">Sustainable Urban Planner</p>
                    <p className="text-textSecondary text-xs">Bangalore</p>
                </div>

                {/* Statistics */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].statistics}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-surface border border-surfaceLight rounded-2xl p-4">
                            <div className="text-3xl font-bold text-primary mb-1">{stats.totalTrips}</div>
                            <div className="text-xs text-textSecondary uppercase">{T[lang].totalTrips}</div>
                        </div>
                        <div className="bg-surface border border-surfaceLight rounded-2xl p-4">
                            <div className="text-3xl font-bold text-success mb-1">{stats.totalCO2Saved}</div>
                            <div className="text-xs text-textSecondary uppercase">kg {T[lang].totalSaved}</div>
                        </div>
                        <div className="bg-surface border border-surfaceLight rounded-2xl p-4">
                            <div className="text-3xl font-bold text-info mb-1">{stats.totalDistance}</div>
                            <div className="text-xs text-textSecondary uppercase">km {T[lang].totalDistance}</div>
                        </div>
                        <div className="bg-surface border border-surfaceLight rounded-2xl p-4">
                            <div className="text-3xl font-bold text-warning mb-1">₹{stats.moneySaved}</div>
                            <div className="text-xs text-textSecondary uppercase">Money Saved</div>
                        </div>
                    </div>
                </div>

                {/* App Preferences */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].appPreferences}</h3>

                    {/* Travel Mode */}
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4 mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                                {persona === 'student' ? '🎒' : persona === 'senior' ? '🧓' : '👔'}
                            </div>
                            <div>
                                <p className="text-xs text-textSecondary uppercase">{T[lang].travelMode}</p>
                                <p className="text-sm font-semibold text-textPrimary">{getPersonaLabel()}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setScreen('onboard')}
                            className="text-primary text-sm font-semibold"
                        >
                            {T[lang].change}
                        </button>
                    </div>

                    {/* Safe Routing */}
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4 mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                                🛡️
                            </div>
                            <div>
                                <p className="text-xs text-textSecondary uppercase">{T[lang].safeRouting}</p>
                                <p className="text-sm font-semibold text-textPrimary">
                                    {safeMode ? T[lang].on : T[lang].off}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => dispatch({ type: 'SET_SAFE_MODE', payload: !safeMode })}
                            className={`w-12 h-6 rounded-full transition-colors ${safeMode ? 'bg-success' : 'bg-surfaceLight'
                                }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${safeMode ? 'ml-6' : 'ml-0.5'
                                    }`}
                            ></div>
                        </button>
                    </div>

                    {/* Auto Optimize */}
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4 mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                                ✨
                            </div>
                            <div>
                                <p className="text-xs text-textSecondary uppercase">{T[lang].autoOptimize}</p>
                                <p className="text-sm font-semibold text-textPrimary">
                                    {preferences.autoOptimize ? T[lang].on : T[lang].off}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'UPDATE_PREFERENCES',
                                    payload: { autoOptimize: !preferences.autoOptimize },
                                })
                            }
                            className={`w-12 h-6 rounded-full transition-colors ${preferences.autoOptimize ? 'bg-primary' : 'bg-surfaceLight'
                                }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${preferences.autoOptimize ? 'ml-6' : 'ml-0.5'
                                    }`}
                            ></div>
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                                🔔
                            </div>
                            <div>
                                <p className="text-xs text-textSecondary uppercase">{T[lang].notificationPrefs}</p>
                                <p className="text-sm font-semibold text-textPrimary">
                                    {preferences.notifications ? T[lang].on : T[lang].off}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'UPDATE_PREFERENCES',
                                    payload: { notifications: !preferences.notifications },
                                })
                            }
                            className={`w-12 h-6 rounded-full transition-colors ${preferences.notifications ? 'bg-primary' : 'bg-surfaceLight'
                                }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${preferences.notifications ? 'ml-6' : 'ml-0.5'
                                    }`}
                            ></div>
                        </button>
                    </div>
                </div>

                {/* Other Settings */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => setScreen('language-accessibility')}
                        className="w-full bg-surface border border-surfaceLight rounded-2xl p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🌐</span>
                            <span className="text-sm font-semibold text-textPrimary">{T[lang].languageAccessibility}</span>
                        </div>
                        <span className="text-textSecondary">→</span>
                    </button>

                    <button className="w-full bg-surface border border-surfaceLight rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔒</span>
                            <span className="text-sm font-semibold text-textPrimary">{T[lang].privacySettings}</span>
                        </div>
                        <span className="text-textSecondary">→</span>
                    </button>

                    <button className="w-full bg-surface border border-surfaceLight rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">ℹ️</span>
                            <span className="text-sm font-semibold text-textPrimary">{T[lang].about}</span>
                        </div>
                        <span className="text-textSecondary">→</span>
                    </button>
                </div>

                {/* Logout */}
                <motion.button
                    className="w-full py-3 bg-danger/10 border border-danger text-danger rounded-2xl font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {T[lang].logout}
                </motion.button>
            </div>
            <BottomNav currentScreen="profile" setScreen={setScreen} />
        </motion.div>
    );
}
