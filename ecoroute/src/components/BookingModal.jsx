import React, { useState } from 'react';

export default function BookingModal({
    lang, T, bookingData, setBookingScreen, setBookings
}) {
    const [confirmed, setConfirmed] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [showToast, setShowToast] = useState(false);

    if (!bookingData) return null;

    // Generate random booking ID and QR code
    const generateBooking = () => {
        const id = 'ECO' + Math.floor(1000 + Math.random() * 9000);
        const qr = 'ECO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        setBookingId(id);
        setQrCode(qr);

        // Add to bookings array
        const newBooking = {
            id,
            provider: bookingData.provider,
            mode: bookingData.providerLogo,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            status: 'Confirmed',
            qrCode: qr
        };
        setBookings(prev => [...prev, newBooking]);
        setConfirmed(true);
    };

    // Close modal and show toast
    const closeModal = () => {
        setShowToast(true);
        setTimeout(() => {
            setBookingScreen(false);
            setShowToast(false);
        }, 100);
    };

    // Generate random QR pattern
    const QRCodePattern = () => {
        const grid = [];
        for (let i = 0; i < 36; i++) {
            grid.push(Math.random() > 0.5);
        }
        return (
            <div className="w-40 h-40 mx-auto my-4 p-2 bg-white border-2 border-gray-300 rounded">
                <div className="grid grid-cols-6 gap-1 w-full h-full">
                    {grid.map((filled, idx) => (
                        <div
                            key={idx}
                            className={`${filled ? 'bg-black' : 'bg-white'} rounded-sm`}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-primary text-white rounded-xl shadow-lg animate-fade-in">
                    🎉 {bookingData.provider} {T[lang].reserve}d! Booking #{bookingId}
                </div>
            )}

            {/* Modal Overlay */}
            <div className="fixed inset-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black bg-opacity-50 z-40 flex items-end">
                {/* Modal Content */}
                <div className="bg-background w-full mx-auto rounded-t-3xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
                    {!confirmed ? (
                        // CONFIRMATION STATE
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {T[lang].confirmReservation}
                                </h2>
                                <button
                                    onClick={() => setBookingScreen(false)}
                                    className="text-3xl text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Booking Summary Card */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <div className="text-center">
                                    <div className="text-6xl mb-3">{bookingData.providerLogo}</div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        {bookingData.provider}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Route leg: Silk Board → Whitefield
                                    </p>
                                    <p className="text-3xl font-bold text-accent mb-2">
                                        {bookingData.estimatedCost}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {bookingData.confirmationTime}
                                    </p>
                                </div>
                            </div>

                            {/* How it works */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">
                                    {T[lang].howItWorks}
                                </h3>
                                <div className="space-y-3">
                                    {bookingData.steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm text-gray-700 flex-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <p className={`text-sm font-semibold mb-2 ${bookingData.availability >= 3 ? 'text-green-700' :
                                    bookingData.availability >= 1 ? 'text-yellow-700' :
                                        'text-red-700'
                                    }`}>
                                    {bookingData.availability} {T[lang].availableNearby}
                                </p>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${bookingData.availability >= 3 ? 'bg-green-500' :
                                            bookingData.availability >= 1 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                        style={{ width: `${(bookingData.availability / 5) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    📍 {bookingData.dockLocation}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={generateBooking}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-opacity-90"
                                >
                                    {T[lang].confirmReservation} ✅
                                </button>
                                <button
                                    onClick={() => setBookingScreen(false)}
                                    className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        // SUCCESS STATE
                        <div className="p-6 text-center">
                            <div className="text-8xl mb-4">✅</div>
                            <h2 className="text-3xl font-bold text-green-700 mb-4">
                                {T[lang].reservationConfirmed}
                            </h2>
                            <div className="bg-gray-100 rounded-lg p-3 mb-4 inline-block">
                                <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                                <p className="text-2xl font-mono font-bold text-gray-800">
                                    {bookingId}
                                </p>
                            </div>

                            {/* QR Code */}
                            <QRCodePattern />
                            <p className="text-sm text-gray-600 mb-4">
                                {T[lang].showAtPickup}
                            </p>

                            <p className="text-lg text-gray-700 mb-6">
                                {bookingData.provider} is ready for you 🎉
                            </p>

                            <button
                                onClick={closeModal}
                                className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-opacity-90"
                            >
                                {T[lang].backToJourney}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -10px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
