import React, { useState } from 'react';
import BottomNav from './shared/BottomNav';

export default function PlannerScreen({
    lang, setLang, persona, safeMode, setSafeMode, setScreen, T,
    fromLocation, setFromLocation, toLocation, setToLocation,
    selectedModes, setSelectedModes
}) {
    const locations = [
        T[lang].silkBoard,
        T[lang].whitefield,
        T[lang].mgRoad,
        T[lang].koramangala,
        T[lang].indiranagar
    ];

    const modes = [
        { id: 'walk', icon: '🚶', label: T[lang].walk },
        { id: 'cycle', icon: '🚲', label: T[lang].cycle },
        { id: 'transit', icon: '🚌', label: T[lang].transit },
        { id: 'auto', icon: '🛺', label: T[lang].auto },
        { id: 'scooter', icon: '🛴', label: T[lang].scooter },
        { id: 'ev', icon: '⚡', label: T[lang].ev },
    ];

    const toggleMode = (modeId) => {
        if (selectedModes.includes(modeId)) {
            setSelectedModes(selectedModes.filter(m => m !== modeId));
        } else {
            setSelectedModes([...selectedModes, modeId]);
        }
    };

    const swapLocations = () => {
        const temp = fromLocation;
        setFromLocation(toLocation);
        setToLocation(temp);
    };

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
                    <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                        {T[lang].appName} 🌿
                    </h1>
                    <button
                        onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
                        className="px-3 py-1.5 rounded-lg bg-white shadow-sm text-sm font-medium text-gray-700"
                    >
                        EN | हिं
                    </button>
                </div>

                {/* Persona Pill */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-gray-700">
                        {getPersonaLabel()}
                    </span>
                </div>

                {/* Location Inputs */}
                <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 relative">
                    <div className="mb-4">
                        <label className="text-xs text-gray-500 uppercase mb-1 block font-semibold">
                            {T[lang].from}
                        </label>
                        <select
                            value={fromLocation}
                            onChange={(e) => setFromLocation(e.target.value)}
                            className="w-full text-lg font-medium text-gray-800 bg-transparent border-none outline-none"
                        >
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <label className="text-xs text-gray-500 uppercase mb-1 block font-semibold">
                            {T[lang].to}
                        </label>
                        <select
                            value={toLocation}
                            onChange={(e) => setToLocation(e.target.value)}
                            className="w-full text-lg font-medium text-gray-800 bg-transparent border-none outline-none"
                        >
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    {/* Swap Button */}
                    <button
                        onClick={swapLocations}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-opacity-90"
                    >
                        ↕
                    </button>
                </div>

                {/* Leave Now */}
                <div className="mb-6">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm text-gray-700">
                        <span>🕐</span>
                        <span className="font-medium">{T[lang].leaveNow}</span>
                        <span className="ml-auto">▾</span>
                    </button>
                </div>

                {/* Mode Selection */}
                <div className="mb-6">
                    <h3 className="text-xs text-gray-500 uppercase mb-3 font-semibold">
                        {T[lang].selectMode}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {modes.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => toggleMode(mode.id)}
                                className={`p-4 rounded-2xl border-2 transition-all ${selectedModes.includes(mode.id)
                                    ? 'bg-accent border-accent text-white'
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="text-2xl mb-1">{mode.icon}</div>
                                <div className="text-xs font-medium">{mode.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mb-6 h-48 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        🗺️ Map View
                    </div>
                </div>

                {/* Find Route Button */}
                <button
                    onClick={() => setScreen('results')}
                    className="w-full h-12 bg-primary text-white rounded-xl font-semibold hover:bg-opacity-90 mb-4"
                >
                    {T[lang].findRoute}
                </button>

                {/* Safe Routing Toggle */}
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-600 font-medium">
                        🛡️ {T[lang].safeRouting}:
                    </span>
                    <button
                        onClick={() => setSafeMode(!safeMode)}
                        className={`font-semibold ${safeMode ? 'text-accent' : 'text-gray-400'}`}
                    >
                        {safeMode ? T[lang].on : T[lang].off}
                    </button>
                </div>
            </div>

            <BottomNav currentScreen="planner" setScreen={setScreen} />
        </div>
    );
}
