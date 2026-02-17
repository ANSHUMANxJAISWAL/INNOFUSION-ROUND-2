import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition } from '../utils/animations';
import BottomNav from './shared/BottomNav';

export default function LanguageAccessibilityScreen({ setScreen }) {
    const { state, dispatch } = useApp();
    const { lang, accessibility } = state;

    const languages = [
        { code: 'EN', label: T[lang].english, flag: '🇬🇧' },
        { code: 'HI', label: 'हिंदी', flag: '🇮🇳' },
    ];

    const fontSizes = ['small', 'medium', 'large'];

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
                    <button onClick={() => setScreen('settings')} className="text-textSecondary">
                        ← {T[lang].back}
                    </button>
                    <h2 className="text-lg font-bold text-textPrimary">🌐 {T[lang].languageAccessibility}</h2>
                    <div className="w-8"></div>
                </div>

                {/* Language Selection */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].selectLanguage}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => dispatch({ type: 'SET_LANG', payload: language.code })}
                                className={`p-4 rounded-2xl border-2 transition-all ${lang === language.code
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-surface border-surfaceLight text-textPrimary'
                                    }`}
                            >
                                <div className="text-3xl mb-2">{language.flag}</div>
                                <div className="text-sm font-semibold">{language.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Font Size */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-textPrimary mb-4">{T[lang].fontSize}</h3>
                    <div className="flex gap-3">
                        {fontSizes.map((size) => (
                            <button
                                key={size}
                                onClick={() =>
                                    dispatch({
                                        type: 'UPDATE_ACCESSIBILITY',
                                        payload: { fontSize: size },
                                    })
                                }
                                className={`flex-1 py-3 rounded-2xl text-sm font-semibold ${accessibility.fontSize === size
                                    ? 'bg-primary text-white'
                                    : 'bg-surface text-textSecondary border border-surfaceLight'
                                    }`}
                            >
                                {T[lang][size]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accessibility Toggles */}
                <div className="space-y-3">
                    {/* High Contrast */}
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-textPrimary mb-1">{T[lang].highContrast}</p>
                            <p className="text-xs text-textSecondary">Increase color contrast</p>
                        </div>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'UPDATE_ACCESSIBILITY',
                                    payload: { highContrast: !accessibility.highContrast },
                                })
                            }
                            className={`w-12 h-6 rounded-full transition-colors ${accessibility.highContrast ? 'bg-primary' : 'bg-surfaceLight'
                                }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${accessibility.highContrast ? 'ml-6' : 'ml-0.5'
                                    }`}
                            ></div>
                        </button>
                    </div>

                    {/* Reduce Motion */}
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-textPrimary mb-1">{T[lang].reduceMotion}</p>
                            <p className="text-xs text-textSecondary">Minimize animations</p>
                        </div>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'UPDATE_ACCESSIBILITY',
                                    payload: { reduceMotion: !accessibility.reduceMotion },
                                })
                            }
                            className={`w-12 h-6 rounded-full transition-colors ${accessibility.reduceMotion ? 'bg-primary' : 'bg-surfaceLight'
                                }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${accessibility.reduceMotion ? 'ml-6' : 'ml-0.5'
                                    }`}
                            ></div>
                        </button>
                    </div>

                    {/* Screen Reader */}
                    <div className="bg-surface border border-surfaceLight rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-textPrimary mb-1">{T[lang].screenReaderSupport}</p>
                            <p className="text-xs text-textSecondary">Enable screen reader announcements</p>
                        </div>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'UPDATE_ACCESSIBILITY',
                                    payload: { screenReader: !accessibility.screenReader },
                                })
                            }
                            className={`w-12 h-6 rounded-full transition-colors ${accessibility.screenReader ? 'bg-primary' : 'bg-surfaceLight'
                                }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${accessibility.screenReader ? 'ml-6' : 'ml-0.5'
                                    }`}
                            ></div>
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="mt-6 bg-primary/10 border border-primary rounded-2xl p-4">
                    <p className="text-sm text-textPrimary">
                        <span className="font-semibold">💡 Tip:</span> These settings help make Pathique more accessible
                        for everyone. Enable features that work best for you.
                    </p>
                </div>
            </div>
            <BottomNav currentScreen="settings" setScreen={setScreen} />
        </motion.div>
    );
}
