import React from 'react';

export default function OnboardingScreen({ lang, setLang, persona, setPersona, safeMode, setSafeMode, setScreen, T }) {
    const handlePersonaSelect = (selectedPersona) => {
        setPersona(selectedPersona);
        if (selectedPersona === 'senior') {
            setSafeMode(true);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Language Toggle */}
                <div className="flex justify-end mb-8">
                    <button
                        onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
                        className="px-4 py-2 rounded-xl bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        EN | हिं
                    </button>
                </div>

                {/* App Name and Tagline */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-2">
                        {T[lang].appName} 🌿
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {T[lang].tagline}
                    </p>
                </div>

                {/* Persona Selection */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        {T[lang].choosePersona}
                    </h2>
                    <div className="space-y-3">
                        {/* Student Card */}
                        <button
                            onClick={() => handlePersonaSelect('student')}
                            className={`w-full p-4 rounded-2xl border-2 transition-all ${persona === 'student'
                                    ? 'border-accent bg-green-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="text-left text-lg font-medium">
                                {T[lang].studentMode}
                            </div>
                        </button>

                        {/* Adult Card */}
                        <button
                            onClick={() => handlePersonaSelect('adult')}
                            className={`w-full p-4 rounded-2xl border-2 transition-all ${persona === 'adult'
                                    ? 'border-accent bg-green-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="text-left text-lg font-medium">
                                {T[lang].adultMode}
                            </div>
                        </button>

                        {/* Senior Card */}
                        <button
                            onClick={() => handlePersonaSelect('senior')}
                            className={`w-full p-4 rounded-2xl border-2 transition-all ${persona === 'senior'
                                    ? 'border-accent bg-green-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="text-left text-lg font-medium">
                                {T[lang].seniorMode}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Safe Routes Toggle */}
                <div className="mb-8">
                    <button
                        onClick={() => setSafeMode(!safeMode)}
                        className="w-full p-4 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-between hover:border-gray-300"
                    >
                        <span className="text-gray-800 font-medium">
                            {T[lang].safeToggle}
                        </span>
                        <div className={`w-12 h-6 rounded-full transition-colors ${safeMode ? 'bg-accent' : 'bg-gray-300'
                            }`}>
                            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${safeMode ? 'ml-6' : 'ml-0.5'
                                }`}></div>
                        </div>
                    </button>
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => setScreen('planner')}
                    className="w-full h-12 bg-primary text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all"
                >
                    {T[lang].continue}
                </button>
            </div>
        </div>
    );
}
