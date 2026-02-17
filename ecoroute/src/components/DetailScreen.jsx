import React, { useState } from 'react';
import BottomNav from './BottomNav';
import { DELAY_PREDICTIONS, getTimeSlot, BOOKING_OPTIONS } from '../data/appData';
import BookingModal from './BookingModal';

export default function DetailScreen({
    lang, setScreen, selectedRoute, T, toLocation,
    bookingScreen, setBookingScreen, bookingData, setBookingData,
    bookings, setBookings
}) {
    const [whatIfExpanded, setWhatIfExpanded] = useState(false);

    if (!selectedRoute) {
        return null;
    }

    const getCrowdingLabel = (crowding) => {
        if (crowding === 'low') return T[lang].crowdingLow;
        if (crowding === 'moderate') return T[lang].crowdingMed;
        if (crowding === 'high') return T[lang].crowdingHigh;
        return '';
    };

    // Calculate total delay for predicted arrival
    const getTotalDelay = () => {
        const timeSlot = getTimeSlot();
        let totalDelay = 0;
        selectedRoute.steps.forEach(step => {
            if (DELAY_PREDICTIONS[step.icon] && DELAY_PREDICTIONS[step.icon][timeSlot]) {
                totalDelay += DELAY_PREDICTIONS[step.icon][timeSlot].delay;
            }
        });
        return totalDelay;
    };

    const totalDelay = getTotalDelay();

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="bg-primary text-white p-4">
                    <button
                        onClick={() => setScreen('results')}
                        className="text-2xl mb-2"
                    >
                        ←
                    </button>
                    <h1 className="text-xl font-bold mb-1">
                        {T[lang].to} {toLocation}
                    </h1>
                    <p className="text-sm opacity-90">
                        {selectedRoute.badge === 'greenest' ? T[lang].greenest :
                            selectedRoute.badge === 'fastest' ? T[lang].fastest :
                                T[lang].cheapest}
                    </p>
                </div>

                {/* Summary Bar */}
                <div className="bg-primary text-white px-4 py-3 flex items-center justify-around text-sm">
                    <div>
                        <div className="font-semibold">{T[lang].total}</div>
                        <div className="text-xs opacity-90">{selectedRoute.time}</div>
                    </div>
                    <div>
                        <div className="font-semibold">{selectedRoute.cost}</div>
                    </div>
                    <div>
                        <div className="font-semibold">🌿 {selectedRoute.co2}</div>
                    </div>
                </div>

                {/* Journey Timeline */}
                <div className="p-4">
                    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
                        {selectedRoute.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3 mb-4 last:mb-0">
                                {/* Icon and Line */}
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-xl">
                                        {step.icon}
                                    </div>
                                    {idx < selectedRoute.steps.length - 1 && (
                                        <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                                    )}
                                </div>

                                {/* Step Details */}
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800 mb-1">
                                        {step.desc}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">
                                        {step.duration} · {step.cost}
                                    </div>

                                    {/* Community Reported Badge */}
                                    {step.community && (
                                        <div className="inline-block px-2 py-1 rounded bg-teal-100 text-teal-700 text-xs font-semibold mb-1">
                                            🤝 {T[lang].communityReported}
                                        </div>
                                    )}

                                    {/* Crowding Badge */}
                                    {step.crowding && (
                                        <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${step.crowding === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                            step.crowding === 'high' ? 'bg-red-100 text-red-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {getCrowdingLabel(step.crowding)}
                                        </div>
                                    )}

                                    {/* Delay Badge */}
                                    {(() => {
                                        const timeSlot = getTimeSlot();
                                        if (DELAY_PREDICTIONS[step.icon] && DELAY_PREDICTIONS[step.icon][timeSlot]) {
                                            const prediction = DELAY_PREDICTIONS[step.icon][timeSlot];
                                            if (prediction.delay === 0) {
                                                return (
                                                    <div className="text-xs text-green-600 mt-1">
                                                        {T[lang].onTime}
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className="mt-1 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                                        <div className="text-xs font-semibold text-yellow-700">
                                                            ⚠️ {prediction.delay} {T[lang].delayExpected}
                                                        </div>
                                                        <div className="text-xs text-gray-600 mt-1">
                                                            {prediction.reason}
                                                        </div>
                                                        <div className="text-xs text-gray-400 mt-0.5">
                                                            {prediction.confidence}% {T[lang].confidence}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }
                                        return null;
                                    })()}
                                </div>
                            </div>
                        ))}

                        {/* Predicted Arrival */}
                        {totalDelay > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="text-sm font-semibold text-yellow-700">
                                    {T[lang].predictedArrival}: {parseInt(selectedRoute.time.split(' ')[0]) + totalDelay} min
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    ({T[lang].includesDelay.replace('min', totalDelay + ' min')})
                                </div>
                            </div>
                        )}
                        {totalDelay === 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="text-sm font-semibold text-green-700">
                                    {T[lang].predictedArrival}: {selectedRoute.time}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {T[lang].onTime}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Nudge Panel */}
                    <div className="bg-nudge rounded-2xl p-4 mb-4">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            {T[lang].whyThisRoute}
                        </h2>

                        {/* Nudge Rows */}
                        <div className="space-y-3 mb-4">
                            <div className="flex gap-3">
                                <span className="text-2xl">💸</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">
                                        {lang === 'EN' ? selectedRoute.nudges.lossFrame : selectedRoute.nudges.lossFrameHI}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {lang === 'EN' ? 'Save for your next weekend getaway' : 'अपनी अगली छुट्टी के लिए बचाएं'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-2xl">🌍</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">
                                        {lang === 'EN' ? selectedRoute.nudges.co2Story : selectedRoute.nudges.co2StoryHI}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {lang === 'EN' ? 'Reduced carbon footprint today' : 'आज कार्बन फुटप्रिंट कम किया'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-2xl">👥</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">
                                        {lang === 'EN' ? selectedRoute.nudges.socialProof : selectedRoute.nudges.socialProofHI}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {lang === 'EN' ? 'Join the collective sustainable movement' : 'सामूहिक स्थायी आंदोलन में शामिल हों'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* What-If Collapsible */}
                        <div className="border-t border-green-200 pt-3">
                            <button
                                onClick={() => setWhatIfExpanded(!whatIfExpanded)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <span className="font-semibold text-gray-800">
                                    {T[lang].whatIf}
                                </span>
                                <span className="text-gray-600">
                                    {whatIfExpanded ? '▴' : '▾'}
                                </span>
                            </button>

                            {whatIfExpanded && (
                                <div className="mt-3 p-3 bg-white rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        {lang === 'EN' ? selectedRoute.nudges.whatIf : selectedRoute.nudges.whatIfHI}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {lang === 'EN'
                                            ? 'If you cycle the first leg instead of walking'
                                            : 'अगर आप पहले हिस्से में पैदल की जगह साइकिल चलाएं'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Dynamic Booking Cards */}
                    <h3 className="font-bold text-gray-800 mb-3 mt-4">
                        {lang === 'EN' ? 'Book Your Ride' : 'अपनी सवारी बुक करें'}
                    </h3>
                    <div className="space-y-3">
                        {(() => {
                            // Find bookable modes in route steps
                            const bookableModes = ['🛴', '⚡', '🛺'];
                            const foundModes = [];

                            selectedRoute.steps.forEach(step => {
                                if (bookableModes.includes(step.icon) && !foundModes.includes(step.icon)) {
                                    foundModes.push(step.icon);
                                }
                            });

                            console.log('🚀 Booking Debug - Found modes:', foundModes);
                            console.log('🚀 Booking Debug - All step icons:', selectedRoute.steps.map(s => s.icon));

                            if (foundModes.length === 0) {
                                return (
                                    <p className="text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
                                        {lang === 'EN' ? 'No bookable services for this route' : 'इस रास्ते के लिए कोई बुक करने योग्य सेवा नहीं'}
                                    </p>
                                );
                            }

                            return foundModes.map(mode => {
                                const option = BOOKING_OPTIONS[mode];
                                if (!option) return null;

                                return (
                                    <div key={mode} className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-accent">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{option.providerLogo}</span>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        {option.provider} · {option.estimatedCost}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">
                                                        📍 {option.dockLocation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={`text-xs font-semibold mb-3 ${option.availability >= 3 ? 'text-green-700' :
                                            option.availability >= 1 ? 'text-yellow-700' :
                                                'text-red-700'
                                            }`}>
                                            {option.availability} {T[lang].availableNearby}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setBookingData(option);
                                                setBookingScreen(true);
                                            }}
                                            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-opacity-90"
                                        >
                                            {T[lang].reserve} {option.provider} →
                                        </button>
                                    </div>
                                );
                            });
                        })()}
                    </div>
                </div>
            </div>

            <BottomNav screen="detail" setScreen={setScreen} lang={lang} T={T} />

            {/* Booking Modal */}
            {bookingScreen && (
                <BookingModal
                    lang={lang}
                    T={T}
                    bookingData={bookingData}
                    setBookingScreen={setBookingScreen}
                    setBookings={setBookings}
                />
            )}
        </div>
    );
}
