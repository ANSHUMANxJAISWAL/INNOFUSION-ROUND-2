import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { T } from '../data/translations';
import { pageVariants, pageTransition, pulseAnimation } from '../utils/animations';

export default function SOSScreen({ setScreen }) {
    const { state } = useApp();
    const { lang } = state;
    const [countdown, setCountdown] = useState(10);
    const [showCancel, setShowCancel] = useState(false);
    const [calling, setCalling] = useState(false);

    useEffect(() => {
        if (countdown > 0 && !calling) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && !calling) {
            setCalling(true);
        }
    }, [countdown, calling]);

    const emergencyServices = [
        { id: 'police', icon: '🚔', label: T[lang].police, number: 'tel:100', color: 'primary' },
        { id: 'ambulance', icon: '🚑', label: T[lang].ambulance, number: 'tel:108', color: 'danger' },
        { id: 'fire', icon: '🚒', label: T[lang].fireServices, number: 'tel:101', color: 'warning' },
    ];

    const handleCancel = () => {
        if (showCancel) {
            setScreen('safety');
        } else {
            setShowCancel(true);
            setTimeout(() => setShowCancel(false), 3000);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-danger text-white flex flex-col"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                {/* SOS Header */}
                <motion.div
                    className="text-center mb-8"
                    {...pulseAnimation}
                >
                    <div className="text-8xl mb-4">🚨</div>
                    <h1 className="text-4xl font-black mb-2">{T[lang].sos}</h1>
                    <p className="text-white/80 text-lg">{T[lang].emergencyCountdown}</p>
                </motion.div>

                {/* Countdown Circle */}
                {!calling ? (
                    <motion.div
                        className="relative mb-8"
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="w-48 h-48 rounded-full border-8 border-white flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-7xl font-black">{countdown}</div>
                                <div className="text-sm uppercase tracking-wider">seconds</div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className="mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        <div className="text-center">
                            <div className="text-6xl mb-4">📞</div>
                            <div className="text-2xl font-bold">{T[lang].calling}</div>
                            <div className="text-lg text-white/80 mt-2">Emergency Services</div>
                        </div>
                    </motion.div>
                )}

                {/* Current Location */}
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6 w-full max-w-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📍</span>
                        <div>
                            <div className="text-xs text-white/60 uppercase mb-1">{T[lang].currentLocation}</div>
                            <div className="font-semibold">Bangalore Central</div>
                            <div className="text-sm text-white/80">12.9716° N, 77.5946° E</div>
                        </div>
                    </div>
                </div>

                {/* Emergency Services */}
                <div className="w-full max-w-sm mb-6">
                    <h3 className="text-sm font-bold uppercase mb-3 text-center text-white/80">
                        {T[lang].autoDialEmergency}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {emergencyServices.map((service) => (
                            <a
                                key={service.id}
                                href={service.number}
                                className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center hover:bg-white/30 transition-colors"
                            >
                                <div className="text-4xl mb-2">{service.icon}</div>
                                <div className="text-xs font-semibold">{service.label}</div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Cancel Button */}
                <motion.button
                    onClick={handleCancel}
                    className={`px-8 py-3 rounded-2xl font-bold text-lg ${showCancel
                            ? 'bg-white text-danger'
                            : 'bg-white/20 backdrop-blur text-white border-2 border-white'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {showCancel ? T[lang].confirmCancel : T[lang].cancel}
                </motion.button>

                {showCancel && (
                    <p className="text-sm text-white/80 mt-3 text-center">
                        Tap again to confirm cancellation
                    </p>
                )}
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white/10 backdrop-blur p-4">
                <div className="max-w-sm mx-auto">
                    <h4 className="text-xs font-bold uppercase mb-2 text-white/80">{T[lang].emergencyContacts}</h4>
                    <div className="flex gap-2 overflow-x-auto">
                        {['Mom', 'Dad', 'Friend'].map((contact) => (
                            <button
                                key={contact}
                                className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg whitespace-nowrap"
                            >
                                <span>👤</span>
                                <span className="text-sm">{contact}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
