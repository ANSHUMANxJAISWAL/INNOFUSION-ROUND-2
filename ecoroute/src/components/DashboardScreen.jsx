import React, { useState, useEffect } from 'react';
import BottomNav from './shared/BottomNav';

export default function DashboardScreen({
    lang, setLang, persona, safeMode, setSafeMode, setScreen, T, bookings
}) {
    const [cityCounter, setCityCounter] = useState(2.3);

    // Live counter that increments every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCityCounter(prev => parseFloat((prev + 0.1).toFixed(1)));
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const getPersonaLabel = () => {
        if (persona === 'student') return T[lang].studentMode;
        if (persona === 'adult') return T[lang].adultMode;
        if (persona === 'senior') return T[lang].seniorMode;
        return '';
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">{T[lang].appName}</h1>
                        <p className="text-sm text-gray-500">CARBON DASHBOARD</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            🔔
                        </button>
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            👤
                        </button>
                    </div>
                </div>

                {/* Hero Card - Your Green Impact */}
                <div className="bg-primary text-white rounded-2xl p-6 mb-4 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">{T[lang].yourImpact}</h2>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div className="text-2xl font-bold">3.2</div>
                            <div className="text-xs opacity-90">{T[lang].kgSaved}</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">24</div>
                            <div className="text-xs opacity-90">{T[lang].kmGreen}</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">8</div>
                            <div className="text-xs opacity-90 uppercase">{T[lang].greenTrips}</div>
                        </div>
                    </div>

                    <div className="bg-yellow-500 bg-opacity-20 rounded-lg px-3 py-2 inline-block">
                        <span className="text-yellow-300 font-semibold text-sm">
                            🔥 {lang === 'EN' ? '5-day green streak!' : '5-दिन की हरित यात्रा!'}
                        </span>
                    </div>
                </div>

                {/* City Impact Card */}
                <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border-l-4 border-accent">
                    <p className="text-xs text-gray-500 uppercase mb-2 font-semibold">
                        {T[lang].cityImpact}
                    </p>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl font-bold text-gray-800">{cityCounter}</span>
                        <span className="text-lg text-gray-600">{T[lang].cityTonnes}</span>
                    </div>
                    <p className="text-sm text-accent font-medium">
                        {T[lang].cityTrees}
                    </p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-800">{T[lang].achievements}</h3>
                        <button className="text-xs text-accent font-semibold uppercase">
                            {T[lang].viewAll}
                        </button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {/* First Green Trip - Unlocked */}
                        <div className="flex-shrink-0 text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl mb-2">
                                🥉
                            </div>
                            <p className="text-xs text-gray-700 font-medium w-20">
                                {T[lang].firstTrip}
                            </p>
                        </div>

                        {/* 10-Day Streak - Unlocked */}
                        <div className="flex-shrink-0 text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-2">
                                🥈
                            </div>
                            <p className="text-xs text-gray-700 font-medium w-20">
                                {T[lang].tenDayStreak}
                            </p>
                        </div>

                        {/* Carbon Hero - Locked */}
                        <div className="flex-shrink-0 text-center opacity-40">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-2">
                                🔒
                            </div>
                            <p className="text-xs text-gray-500 font-medium w-20">
                                {T[lang].carbonHero}
                            </p>
                        </div>
                    </div>
                </div>

                {/* My Bookings */}
                <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">{T[lang].myBookings}</h3>

                    {bookings.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            {T[lang].noBookings}
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {bookings.map((booking, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-accent">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{booking.mode}</span>
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {booking.provider} · Booking #{booking.id}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {booking.time}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                            ✅ {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Preferences */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-3">{T[lang].preferences}</h3>

                    {/* Travel Mode */}
                    <div className="bg-white rounded-xl p-4 mb-3 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                {persona === 'student' ? '🎒' : persona === 'senior' ? '🧓' : '👔'}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">
                                    {T[lang].travelMode}
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {getPersonaLabel()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setScreen('onboard')}
                            className="text-accent text-sm font-semibold"
                        >
                            {T[lang].change}
                        </button>
                    </div>

                    {/* Safe Routing */}
                    <div className="bg-white rounded-xl p-4 mb-3 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                🛡️
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">
                                    {T[lang].safeRouting}
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {safeMode ? T[lang].on : T[lang].off}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSafeMode(!safeMode)}
                            className={`w-12 h-6 rounded-full transition-colors ${safeMode ? 'bg-accent' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${safeMode ? 'ml-6' : 'ml-0.5'
                                }`}></div>
                        </button>
                    </div>

                    {/* Language */}
                    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                🌐
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">
                                    {T[lang].language}
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {lang === 'EN' ? T[lang].english : 'हिंदी'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setLang('EN')}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold ${lang === 'EN' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang('HI')}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold ${lang === 'HI' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                हिं
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav currentScreen="dashboard" setScreen={setScreen} />
        </div>
    );
}
