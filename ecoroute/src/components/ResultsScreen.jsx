import React from 'react';
import BottomNav from './BottomNav';
import { routesData } from '../data/routes';
import { DELAY_PREDICTIONS, getTimeSlot } from '../data/appData';

export default function ResultsScreen({
    lang, setLang, persona, safeMode, setScreen, setSelectedRoute, T,
    fromLocation, toLocation
}) {
    // Persona-based route reordering logic
    const getOrderedRoutes = () => {
        let routes = [...routesData];

        if (persona === 'student') {
            // Student: Cheapest → Greenest → Fastest
            routes.sort((a, b) => {
                const costA = parseInt(a.cost.replace('₹', ''));
                const costB = parseInt(b.cost.replace('₹', ''));
                return costA - costB;
            });
        } else if (persona === 'senior') {
            // Senior: Safe routes first (greenest), then others
            routes.sort((a, b) => {
                if (a.safe && !b.safe) return -1;
                if (!a.safe && b.safe) return 1;
                // Among safe routes, greenest first
                if (a.badge === 'greenest') return -1;
                if (b.badge === 'greenest') return 1;
                return 0;
            });
        }
        // Adult: default order (Greenest → Fastest → Cheapest) - already in routesData

        return routes;
    };

    const orderedRoutes = getOrderedRoutes();

    const getBadgeLabel = (badge) => {
        if (badge === 'greenest') return T[lang].greenest;
        if (badge === 'fastest') return T[lang].fastest;
        if (badge === 'cheapest') return T[lang].cheapest;
        return '';
    };

    const getCrowdingLabel = (crowding) => {
        if (crowding === 'low') return T[lang].crowdingLow;
        if (crowding === 'moderate') return T[lang].crowdingMed;
        if (crowding === 'high') return T[lang].crowdingHigh;
        return '';
    };

    const handleRouteSelect = (route) => {
        setSelectedRoute(route);
        setScreen('detail');
    };

    // Get max delay for a route based on current time slot
    const getRouteMaxDelay = (route) => {
        const timeSlot = getTimeSlot();
        let maxDelay = 0;
        let maxConfidence = 100;

        route.modes.forEach(mode => {
            if (DELAY_PREDICTIONS[mode] && DELAY_PREDICTIONS[mode][timeSlot]) {
                const prediction = DELAY_PREDICTIONS[mode][timeSlot];
                if (prediction.delay > maxDelay) {
                    maxDelay = prediction.delay;
                    maxConfidence = prediction.confidence;
                }
            }
        });

        return { delay: maxDelay, confidence: maxConfidence };
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <button
                            onClick={() => setScreen('planner')}
                            className="text-primary text-2xl mb-2"
                        >
                            ←
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            {fromLocation} → {toLocation}
                        </h1>
                        <p className="text-sm text-gray-500">42 {T[lang].routesFound}</p>
                    </div>
                    <button
                        onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
                        className="px-3 py-1.5 rounded-lg bg-white shadow-sm text-sm font-medium text-gray-700"
                    >
                        EN | हिं
                    </button>
                </div>

                {/* Route Cards */}
                <div className="space-y-4 mb-20">
                    {orderedRoutes.map((route) => (
                        <div
                            key={route.id}
                            className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-accent cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleRouteSelect(route)}
                        >
                            {/* Badge and Time */}
                            <div className="flex items-start justify-between mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${route.badgeColor}`}>
                                    {getBadgeLabel(route.badge)}
                                </span>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-800">{route.time.split(' ')[0]}</div>
                                    <div className="text-xs text-gray-500">{route.time.split(' ')[1]}</div>
                                </div>
                            </div>

                            {/* Mode Icons */}
                            <div className="flex items-center gap-2 mb-3">
                                {route.modes.map((mode, idx) => (
                                    <React.Fragment key={idx}>
                                        <span className="text-2xl">{mode}</span>
                                        {idx < route.modes.length - 1 && (
                                            <span className="text-gray-400">→</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center gap-4 text-sm mb-2">
                                <span className="font-semibold text-gray-700">{route.cost}</span>
                                <span className="text-accent font-semibold">🌿 {route.co2}</span>
                            </div>

                            {/* CO2 Analogy */}
                            <p className="text-xs text-gray-500 mb-3">
                                {route.analogy}
                            </p>

                            {/* Badges Row */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {safeMode && route.safe && (
                                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                        {T[lang].safeRoute}
                                    </span>
                                )}
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${route.crowding === 'low' ? 'bg-green-100 text-green-700' :
                                    route.crowding === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                    {getCrowdingLabel(route.crowding)}
                                </span>
                            </div>

                            {/* Delay Forecast Row */}
                            {(() => {
                                const { delay, confidence } = getRouteMaxDelay(route);
                                if (delay === 0) {
                                    return (
                                        <div className="mt-2 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold inline-block">
                                            {T[lang].onTime} · {confidence}% {T[lang].confidence}
                                        </div>
                                    );
                                } else if (delay >= 1 && delay <= 9) {
                                    return (
                                        <div className="mt-2 px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold inline-block">
                                            ⚠️ ~{delay} {T[lang].delayExpected}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="mt-2 px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold inline-block">
                                            🔴 {delay} {T[lang].delayExpected} · {T[lang].considerAlt}
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    ))}
                </div>

                {/* What-If Button */}
                <div className="fixed bottom-20 left-0 right-0 px-4">
                    <div className="max-w-md mx-auto">
                        <button className="w-full py-3 rounded-xl bg-white border-2 border-accent text-accent font-semibold hover:bg-green-50">
                            {T[lang].whatIfChange} ▾
                        </button>
                    </div>
                </div>
            </div>

            <BottomNav screen="results" setScreen={setScreen} lang={lang} T={T} />
        </div>
    );
}
