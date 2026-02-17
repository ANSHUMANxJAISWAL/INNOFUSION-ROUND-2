const DELAY_PREDICTIONS = {
    "🚌": {
        morning_peak: { delay: 12, confidence: 87, reason: "Heavy traffic near Silk Board junction" },
        afternoon: { delay: 3, confidence: 91, reason: "Light traffic, on schedule" },
        evening_peak: { delay: 18, confidence: 82, reason: "IT corridor congestion, Outer Ring Road" }
    },
    "🚇": {
        morning_peak: { delay: 5, confidence: 94, reason: "High passenger volume at MG Road station" },
        afternoon: { delay: 0, confidence: 98, reason: "Running on schedule" },
        evening_peak: { delay: 8, confidence: 89, reason: "Signal delay between Baiyappanahalli–Whitefield" }
    },
    "🛺": {
        morning_peak: { delay: 7, confidence: 78, reason: "Peak demand, fewer autos available" },
        afternoon: { delay: 2, confidence: 85, reason: "Available near Koramangala" },
        evening_peak: { delay: 10, confidence: 80, reason: "Surge in demand post office hours" }
    },
    "🛴": {
        morning_peak: { delay: 0, confidence: 95, reason: "Docked scooters available at stop" },
        afternoon: { delay: 0, confidence: 97, reason: "Fully available" },
        evening_peak: { delay: 4, confidence: 83, reason: "Low scooter availability at Whitefield dock" }
    },
    "🚶": {
        morning_peak: { delay: 0, confidence: 99, reason: "No delay" },
        afternoon: { delay: 0, confidence: 99, reason: "No delay" },
        evening_peak: { delay: 0, confidence: 99, reason: "No delay" }
    }
};

// Helper function to get current time slot based on system time
export const getTimeSlot = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 10) {
        return 'morning_peak';
    } else if (hour >= 10 && hour < 17) {
        return 'afternoon';
    } else if (hour >= 17 && hour < 22) {
        return 'evening_peak';
    } else {
        return 'morning_peak'; // default
    }
};

const BOOKING_OPTIONS = {
    "🛴": {
        provider: "Yulu Scooter",
        providerLogo: "🛴",
        pricePerMin: 2,
        unlockFee: 10,
        estimatedCost: "₹11",
        availability: 3,
        dockLocation: "Whitefield EcoHub Stand, Gate 2",
        steps: ["Scan QR at dock", "Helmet in front basket", "Lock at destination dock"],
        confirmationTime: "Instant"
    },
    "⚡": {
        provider: "Zoomcar EV",
        providerLogo: "⚡",
        pricePerMin: 4,
        unlockFee: 0,
        estimatedCost: "₹45",
        availability: 1,
        dockLocation: "Silk Board EV Bay, Slot 3B",
        steps: ["Show QR to attendant", "Pre-check battery level", "Return to any EV bay"],
        confirmationTime: "2 min"
    },
    "🛺": {
        provider: "Shared Auto",
        providerLogo: "🛺",
        pricePerMin: 0,
        unlockFee: 0,
        estimatedCost: "₹15",
        availability: 5,
        dockLocation: "Silk Board flyover, northbound lane",
        steps: ["Wait at marked stop", "Pay conductor directly", "Alight at BTM Layout main"],
        confirmationTime: "Community route · No booking needed"
    }
};

export { DELAY_PREDICTIONS, BOOKING_OPTIONS };
