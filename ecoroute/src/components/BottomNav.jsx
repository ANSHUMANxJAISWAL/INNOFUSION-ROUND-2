import React from 'react';

export default function BottomNav({ screen, setScreen, lang, T }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-md mx-auto flex">
                {/* Plan Tab */}
                <button
                    onClick={() => setScreen('planner')}
                    className={`flex-1 py-4 text-center transition-colors ${screen === 'planner' || screen === 'results' || screen === 'detail'
                            ? 'text-primary font-semibold'
                            : 'text-gray-500'
                        }`}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-lg mb-1">🗺️</span>
                        <span className="text-sm">{T[lang].plan}</span>
                        {(screen === 'planner' || screen === 'results' || screen === 'detail') && (
                            <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
                        )}
                    </div>
                </button>

                {/* Impact Tab */}
                <button
                    onClick={() => setScreen('dashboard')}
                    className={`flex-1 py-4 text-center transition-colors ${screen === 'dashboard'
                            ? 'text-primary font-semibold'
                            : 'text-gray-500'
                        }`}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-lg mb-1">📊</span>
                        <span className="text-sm">{T[lang].impact}</span>
                        {screen === 'dashboard' && (
                            <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
}
