import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export default function BottomNav({ currentScreen, setScreen }) {
    const { state } = useApp();

    // Calculate notification count (safety alerts + new updates)
    const notificationCount = state.safetyAlerts?.length || 0;
    const hasNotifications = notificationCount > 0;

    const navItems = [
        {
            id: 'home',
            label: 'Home',
            icon: '🏠',
            screen: 'home',
        },
        {
            id: 'map',
            label: 'Navigate',
            icon: '🗺️',
            screen: 'map',
        },
        {
            id: 'assistant',
            label: 'Assistant',
            icon: '🎤',
            screen: 'voice-assistant',
        },
        {
            id: 'dashboard',
            label: 'Stats',
            icon: '📊',
            screen: 'dashboard',
            badge: hasNotifications ? notificationCount : null,
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: '👤',
            screen: 'settings',
        },
    ];

    const handleNavClick = (item) => {
        setScreen(item.screen);
    };

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-surface/95 backdrop-blur-lg border-t border-surfaceLight z-50 safe-area-bottom">
            <div className="w-full">
                {/* Safety Status Bar (if safety mode is active) */}
                {state.safeMode && (
                    <div className="px-4 py-1 bg-success/10 border-b border-success/20">
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-xs text-success font-semibold uppercase tracking-wider">
                                Safety Mode Active
                            </span>
                        </div>
                    </div>
                )}

                {/* Navigation Items */}
                <div className="flex items-center justify-around py-2 px-2">
                    {navItems.map((item) => {
                        const isActive = currentScreen === item.screen;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[64px] ${isActive
                                    ? 'text-primary'
                                    : 'text-textSecondary hover:text-textPrimary'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {/* Badge for notifications */}
                                {item.badge && (
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                    >
                                        <span className="text-white text-xs font-bold">
                                            {item.badge > 9 ? '9+' : item.badge}
                                        </span>
                                    </motion.div>
                                )}

                                {/* Icon */}
                                <span className={`text-2xl transition-transform ${isActive ? 'scale-110' : ''}`}>
                                    {item.icon}
                                </span>

                                {/* Label */}
                                <span className={`text-xs font-semibold uppercase tracking-wide ${isActive ? 'text-primary' : ''
                                    }`}>
                                    {item.label}
                                </span>

                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                                        layoutId="activeIndicator"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Quick Action Bar (optional, can be toggled) */}
                {state.preferences?.showQuickActions && (
                    <div className="px-4 pb-2 pt-1 border-t border-surfaceLight/50">
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setScreen('sos')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 border border-danger/30 rounded-lg text-danger text-xs font-semibold hover:bg-danger/20 transition-colors"
                            >
                                <span>🚨</span>
                                <span>SOS</span>
                            </button>
                            <button
                                onClick={() => setScreen('planner')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                            >
                                <span>✨</span>
                                <span>Plan Trip</span>
                            </button>
                            <button
                                onClick={() => setScreen('safety')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 border border-success/30 rounded-lg text-success text-xs font-semibold hover:bg-success/20 transition-colors"
                            >
                                <span>🛡️</span>
                                <span>Safety</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
