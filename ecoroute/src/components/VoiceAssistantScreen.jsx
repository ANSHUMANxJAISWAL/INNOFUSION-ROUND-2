import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition } from '../utils/animations';
import { micButtonVariants, actionButtonVariants } from '../utils/voiceAnimations';
import VoiceVisualizer from './shared/VoiceVisualizer';
import AssistantMessage from './shared/AssistantMessage';
import BottomNav from './shared/BottomNav';

export default function VoiceAssistantScreen({ setScreen }) {
    const { state, dispatch } = useApp();
    const { lang, voiceAssistant } = state;
    const [voiceState, setVoiceState] = useState('idle'); // idle, listening, processing, speaking

    const toggleVoiceState = () => {
        if (voiceState === 'idle') {
            setVoiceState('listening');
            dispatch({ type: 'SET_VOICE_STATE', payload: 'listening' });

            // Simulate processing after 3 seconds
            setTimeout(() => {
                setVoiceState('processing');
                dispatch({ type: 'SET_VOICE_STATE', payload: 'processing' });

                // Then speaking
                setTimeout(() => {
                    setVoiceState('speaking');
                    dispatch({ type: 'SET_VOICE_STATE', payload: 'speaking' });

                    // Return to idle
                    setTimeout(() => {
                        setVoiceState('idle');
                        dispatch({ type: 'SET_VOICE_STATE', payload: 'idle' });
                    }, 2000);
                }, 1000);
            }, 3000);
        } else {
            setVoiceState('idle');
            dispatch({ type: 'SET_VOICE_STATE', payload: 'idle' });
        }
    };

    const handleActionButton = (action) => {
        if (action === 'route') {
            setScreen('results');
        } else if (action === 'charging') {
            setScreen('energy');
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-background text-textPrimary pb-20"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center">
                            <span className="text-xl">✨</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-textPrimary">Pathique AI</h1>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                <span className="text-xs text-primary uppercase font-semibold tracking-wider">
                                    System Active
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surfaceLight hover:border-primary/50 transition-colors">
                        <span className="text-sm font-semibold text-textPrimary">{lang}</span>
                        <span className="text-sm">🌐</span>
                    </button>
                </div>

                {/* Assistant Message */}
                <div className="mb-8">
                    <AssistantMessage
                        message={voiceAssistant.currentMessage}
                        avatar={state.user.avatar}
                    />
                </div>

                {/* Voice Visualizer */}
                <div className="flex flex-col items-center justify-center py-8 mb-8">
                    <VoiceVisualizer state={voiceState} />

                    {/* Status Text */}
                    <p className="text-textPrimary text-center mt-8 mb-2">
                        Find the <span className="text-primary font-semibold">best route</span> to Downtown...
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-8">
                    <motion.button
                        onClick={() => handleActionButton('route')}
                        className="flex-1 px-4 py-3 bg-surface border border-surfaceLight rounded-xl flex items-center gap-2 text-textPrimary"
                        variants={actionButtonVariants}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <span className="text-lg">🗺️</span>
                        <span className="text-sm font-semibold">Best route now</span>
                    </motion.button>

                    <motion.button
                        onClick={() => handleActionButton('charging')}
                        className="flex-1 px-4 py-3 bg-surface border border-surfaceLight rounded-xl flex items-center gap-2 text-textPrimary"
                        variants={actionButtonVariants}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <span className="text-lg">🔋</span>
                        <span className="text-sm font-semibold">Charge my EV to</span>
                    </motion.button>
                </div>

                {/* Floating Microphone Button */}
                <div className="flex justify-center mb-12">
                    <motion.button
                        onClick={toggleVoiceState}
                        className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl"
                        variants={micButtonVariants}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                        animate={voiceState !== 'idle' ? 'active' : 'idle'}
                    >
                        🎤
                    </motion.button>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav currentScreen="voice-assistant" setScreen={setScreen} />
        </motion.div>
    );
}
