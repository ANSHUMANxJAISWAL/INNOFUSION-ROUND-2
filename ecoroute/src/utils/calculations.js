/**
 * Utility functions for calculations
 */

// Carbon footprint calculations (kg CO2 per km)
const CARBON_FACTORS = {
    walk: 0,
    cycle: 0,
    transit: 0.05,
    auto: 0.15,
    scooter: 0.08,
    ev: 0.02,
    car: 0.2,
};

export function calculateCarbonFootprint(mode, distance) {
    const factor = CARBON_FACTORS[mode] || 0.1;
    return (factor * distance).toFixed(2);
}

export function calculateTotalCarbon(segments) {
    return segments.reduce((total, segment) => {
        return total + parseFloat(calculateCarbonFootprint(segment.mode, segment.distance));
    }, 0).toFixed(2);
}

// Cost calculations (₹ per km)
const COST_FACTORS = {
    walk: 0,
    cycle: 0,
    transit: 2,
    auto: 12,
    scooter: 5,
    ev: 8,
    car: 10,
};

export function calculateCost(mode, distance) {
    const factor = COST_FACTORS[mode] || 5;
    return Math.round(factor * distance);
}

export function calculateTotalCost(segments) {
    return segments.reduce((total, segment) => {
        return total + calculateCost(segment.mode, segment.distance);
    }, 0);
}

// Time estimations (minutes per km)
const SPEED_FACTORS = {
    walk: 12,      // 5 km/h
    cycle: 5,      // 12 km/h
    transit: 3,    // 20 km/h (with stops)
    auto: 3,       // 20 km/h
    scooter: 4,    // 15 km/h
    ev: 2,         // 30 km/h
    car: 2,        // 30 km/h
};

export function calculateDuration(mode, distance) {
    const factor = SPEED_FACTORS[mode] || 4;
    return Math.round(factor * distance);
}

export function calculateTotalDuration(segments) {
    return segments.reduce((total, segment) => {
        return total + calculateDuration(segment.mode, segment.distance);
    }, 0);
}

// Energy consumption calculations (kWh per 100km for EVs)
export function calculateEnergyConsumption(distance, efficiency = 15) {
    return ((efficiency / 100) * distance).toFixed(2);
}

// Route optimization scores
export function calculateRouteScore(route) {
    const carbonScore = 100 - (parseFloat(route.carbon) * 10);
    const costScore = 100 - (route.cost / 10);
    const timeScore = 100 - (route.duration / 2);
    const safetyScore = route.safetyScore || 80;

    return {
        carbon: Math.max(0, Math.min(100, carbonScore)),
        cost: Math.max(0, Math.min(100, costScore)),
        time: Math.max(0, Math.min(100, timeScore)),
        safety: safetyScore,
        overall: Math.round((carbonScore + costScore + timeScore + safetyScore) / 4),
    };
}

// Format duration to human-readable
export function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Format distance
export function formatDistance(km) {
    if (km < 1) {
        return `${Math.round(km * 1000)}m`;
    }
    return `${km.toFixed(1)}km`;
}

// Calculate savings compared to car
export function calculateSavings(segments) {
    const actualCarbon = parseFloat(calculateTotalCarbon(segments));
    const actualCost = calculateTotalCost(segments);

    const totalDistance = segments.reduce((sum, seg) => sum + seg.distance, 0);
    const carCarbon = parseFloat(calculateCarbonFootprint('car', totalDistance));
    const carCost = calculateCost('car', totalDistance);

    return {
        carbonSaved: (carCarbon - actualCarbon).toFixed(2),
        moneySaved: carCost - actualCost,
        percentageSaved: Math.round(((carCarbon - actualCarbon) / carCarbon) * 100),
    };
}
