import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const AppContext = createContext();

const initialState = {
    // User Profile
    user: {
        name: 'Anaya',
        role: 'Sustainable Urban Planner',
        location: 'Bangalore',
        avatar: null, // Will be set dynamically
    },

    // Weather Data
    weather: {
        time: '08:30 AM',
        temperature: '24°C',
        condition: 'Overcast',
        icon: '☁️',
        readyToWalk: true,
    },

    // Global Settings
    persona: 'adult',
    lang: 'EN',
    safeMode: false,

    // Location State
    fromLocation: 'Silk Board',
    toLocation: 'Whitefield',
    selectedModes: ['walk', 'transit', 'auto', 'scooter'],

    // Current Screen/Route
    selectedRoute: null,

    // Bookings
    bookings: [],

    // Energy Mode State
    chargingPlan: {
        startTime: '22:00',
        endTime: '06:00',
        intensity: 'medium',
        carbonAware: true,
    },
    energyConsumption: [],

    // Safety Mode State
    safetyAlerts: [],
    safetyScore: 85,
    riskAssessment: {
        traffic: 75,
        crime: 90,
        lighting: 80,
    },

    // Journey Timeline State
    journeySegments: [],
    activeJourneyId: null,

    // Voice Assistant State
    voiceAssistant: {
        enabled: false,
        state: 'idle', // idle, listening, processing, speaking
        lastCommand: null,
        currentMessage: "I've optimized your route for the lowest energy consumption. Shall I begin navigation or check for EV chargers along the way?",
        systemActive: true,
    },

    // Settings
    preferences: {
        defaultMode: 'carbon',
        notifications: true,
        autoOptimize: true,
        showQuickActions: true, // Show quick action buttons in bottom nav
    },

    // Accessibility
    accessibility: {
        fontSize: 'medium',
        highContrast: false,
        reduceMotion: false,
        screenReader: false,
    },

    // Statistics
    stats: {
        totalTrips: 8,
        totalCO2Saved: 3.2,
        totalDistance: 24,
        moneySaved: 145,
    },
};

function appReducer(state, action) {
    switch (action.type) {
        case 'SET_PERSONA':
            return { ...state, persona: action.payload };

        case 'SET_LANG':
            return { ...state, lang: action.payload };

        case 'SET_SAFE_MODE':
            return { ...state, safeMode: action.payload };

        case 'SET_FROM_LOCATION':
            return { ...state, fromLocation: action.payload };

        case 'SET_TO_LOCATION':
            return { ...state, toLocation: action.payload };

        case 'SET_SELECTED_MODES':
            return { ...state, selectedModes: action.payload };

        case 'SET_SELECTED_ROUTE':
            return { ...state, selectedRoute: action.payload };

        case 'ADD_BOOKING':
            return { ...state, bookings: [...state.bookings, action.payload] };

        case 'SET_CHARGING_PLAN':
            return { ...state, chargingPlan: { ...state.chargingPlan, ...action.payload } };

        case 'ADD_SAFETY_ALERT':
            return { ...state, safetyAlerts: [...state.safetyAlerts, action.payload] };

        case 'UPDATE_SAFETY_SCORE':
            return { ...state, safetyScore: action.payload };

        case 'SET_JOURNEY_SEGMENTS':
            return { ...state, journeySegments: action.payload };

        case 'SET_USER_PROFILE':
            return { ...state, user: { ...state.user, ...action.payload } };

        case 'SET_WEATHER':
            return { ...state, weather: { ...state.weather, ...action.payload } };

        case 'SET_VOICE_STATE':
            return { ...state, voiceAssistant: { ...state.voiceAssistant, state: action.payload } };

        case 'SET_VOICE_MESSAGE':
            return { ...state, voiceAssistant: { ...state.voiceAssistant, currentMessage: action.payload } };

        case 'SET_VOICE_COMMAND':
            return { ...state, voiceAssistant: { ...state.voiceAssistant, lastCommand: action.payload } };

        case 'TOGGLE_VOICE_ASSISTANT':
            return { ...state, voiceAssistant: { ...state.voiceAssistant, enabled: !state.voiceAssistant.enabled } };

        case 'UPDATE_PREFERENCES':
            return { ...state, preferences: { ...state.preferences, ...action.payload } };

        case 'UPDATE_ACCESSIBILITY':
            return { ...state, accessibility: { ...state.accessibility, ...action.payload } };

        case 'UPDATE_STATS':
            return { ...state, stats: { ...state.stats, ...action.payload } };

        case 'SWAP_LOCATIONS':
            return {
                ...state,
                fromLocation: state.toLocation,
                toLocation: state.fromLocation,
            };

        case 'LOAD_STATE':
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load state from localStorage on mount
    useEffect(() => {
        const savedState = loadFromStorage('ecoroute_state');
        if (savedState) {
            dispatch({ type: 'LOAD_STATE', payload: savedState });
        }
    }, []);

    // Save state to localStorage on change
    useEffect(() => {
        saveToStorage('ecoroute_state', state);
    }, [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}
