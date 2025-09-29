// TripBuddy - Utility Functions

// LocalStorage helper functions
const StorageUtils = {
    get: (key, defaultValue = []) => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch (error) {
            console.warn(`Could not retrieve ${key} from localStorage:`, error);
            return defaultValue;
        }
    },

    set: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.warn(`Could not save ${key} to localStorage:`, error);
            return false;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn(`Could not remove ${key} from localStorage:`, error);
            return false;
        }
    }
};

// Cost calculation utilities
const CostCalculator = {
    calculateFuelCost: (distance, mileage, fuelPrice, isRoundTrip = true) => {
        const totalDistance = isRoundTrip ? distance * 2 : distance;
        const fuelNeeded = totalDistance / parseFloat(mileage);
        return Math.round(fuelNeeded * parseFloat(fuelPrice));
    },

    calculateAccommodationCost: (travelers, nights = 1) => {
        return parseInt(travelers) * 2000 * nights; // ₹2000 per person per night
    },

    calculateFoodCost: (travelers, days = 1) => {
        return parseInt(travelers) * 1000 * days; // ₹1000 per person per day
    },

    calculateMiscCost: (travelers) => {
        return parseInt(travelers) * 500; // ₹500 per person for miscellaneous
    },

    calculateTotalCost: (fuelCost, accommodationCost, foodCost, miscCost, tollCost = 0) => {
        return fuelCost + accommodationCost + foodCost + miscCost + tollCost;
    }
};

// Date and time utilities
const DateUtils = {
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    getCurrentDate: () => {
        return new Date().toISOString().split('T')[0];
    },

    isValidDate: (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }
};

// String utilities
const StringUtils = {
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    },

    truncateText: (text, length = 100) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }
};

// Validation utilities
const ValidationUtils = {
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isValidPhoneNumber: (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
        return phoneRegex.test(phone);
    },

    isPositiveNumber: (value) => {
        return !isNaN(value) && parseFloat(value) > 0;
    }
};

// Search and filter utilities
const SearchUtils = {
    filterDestinations: (destinations, query) => {
        if (!query) return destinations;
        
        const lowercaseQuery = query.toLowerCase();
        return destinations.filter(dest => 
            dest.name.toLowerCase().includes(lowercaseQuery) ||
            dest.state.toLowerCase().includes(lowercaseQuery) ||
            dest.description.toLowerCase().includes(lowercaseQuery) ||
            (dest.tags && dest.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
        );
    },

    getDestinationsByCategory: (destinations, category) => {
        switch (category) {
            case 'trending':
                return destinations.filter(d => d.trending);
            case 'aiRecommended':
                return destinations.filter(d => d.aiRecommended);
            case 'hot':
                return destinations.filter(d => parseInt(d.temperature) > 25);
            case 'cold':
                return destinations.filter(d => parseInt(d.temperature) <= 15);
            // Handle new text-based categories by checking tags
            case 'Adventure': case 'Religious Places': case 'Historical & Heritage': case 'Nature & Wildlife': case 'Beaches': case 'Food & Culture': case 'Hill Stations': case 'Deserts': case 'Lakes & Rivers': case 'Islands': case 'Urban Escapes': case 'Villages': case 'Wellness': case 'Festivals': case 'Road Trips': case 'International':
                const lowercaseCategory = category.toLowerCase();
                return destinations.filter(d => d.tags && d.tags.some(tag => tag.toLowerCase().includes(lowercaseCategory)));
            default:
                return destinations;
        }
    }
};

// Weather utilities
const WeatherUtils = {
    generateMockWeather: () => {
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
        const temperature = Math.floor(Math.random() * (randomWeather.temp[1] - randomWeather.temp[0] + 1)) + randomWeather.temp[0];

        return {
            location: randomCity,
            temperature: temperature,
            condition: randomWeather.condition,
            icon: randomWeather.icon
        };
    },

    getWeatherRecommendation: (temperature) => {
        if (temperature > 30) {
            return "Great weather for hill stations!";
        } else if (temperature < 15) {
            return "Perfect for warm coastal areas!";
        } else {
            return "Ideal weather for sightseeing!";
        }
    },

    getDestinationsByWeather: (destinations, temperature) => {
        if (temperature > 30) {
            return destinations.filter(d => 
                ['Kerala', 'Himachal Pradesh', 'Uttarakhand'].includes(d.state)
            );
        } else if (temperature < 10) {
            return destinations.filter(d => 
                ['Goa', 'Rajasthan', 'Kerala'].includes(d.state)
            );
        }
        return [];
    }
};

// Animation utilities
const AnimationUtils = {
    fadeIn: (element) => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.3s ease-in-out';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },

    slideUp: (element) => {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.3s ease-out';
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 10);
    }
};

// Error handling utilities
const ErrorUtils = {
    handleError: (error, context = 'Unknown') => {
        console.error(`Error in ${context}:`, error);
        return {
            success: false,
            error: error.message || 'An unexpected error occurred',
            context
        };
    },

    showToast: (message, type = 'info') => {
        // Simple toast notification (can be enhanced with a toast library)
        const toast = document.createElement('div');
        toast.className = `fixed top-20 right-4 p-4 rounded-lg text-white z-50 ${
            type === 'error' ? 'bg-red-500' : 
            type === 'success' ? 'bg-green-500' : 
            'bg-blue-500'
        }`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }
};