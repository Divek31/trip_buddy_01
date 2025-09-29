// TripBuddy - API Services and Data Management

// User Authentication API
const AuthAPI = {
    login: async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const userData = {
                id: Date.now(),
                name: email.split('@')[0],
                email: email,
                loginTime: new Date().toISOString()
            };
            StorageUtils.set('user', userData);
            return { success: true, user: userData };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Login');
        }
    },

    register: async (name, email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const userData = {
                id: Date.now(),
                name: name,
                email: email,
                registrationTime: new Date().toISOString()
            };
            StorageUtils.set('user', userData);
            return { success: true, user: userData };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Registration');
        }
    },

    logout: () => {
        try {
            StorageUtils.remove('user');
            return { success: true };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Logout');
        }
    },

    getCurrentUser: () => {
        return StorageUtils.get('user', null);
    }
};

// Destinations API
const DestinationsAPI = {
    getAll: () => {
        try {
            return { success: true, destinations: destinations };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Destinations');
        }
    },

    getById: (id) => {
        try {
            const destination = destinations.find(d => d.id === parseInt(id));
            if (!destination) throw new Error('Destination not found');
            return { success: true, destination: destination };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Destination by ID');
        }
    },

    search: (query) => {
        try {
            const filtered = SearchUtils.filterDestinations(destinations, query);
            return { success: true, destinations: filtered };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Search Destinations');
        }
    },

    getByCategory: (category) => {
        try {
            const filtered = SearchUtils.getDestinationsByCategory(destinations, category);
            return { success: true, destinations: filtered };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Destinations by Category');
        }
    },

    getTouristPlaces: (destinationId) => {
        try {
            const destination = destinations.find(d => d.id === parseInt(destinationId));
            if (!destination) throw new Error('Destination not found');
            const touristPlaces = [
                { id: 1, name: `Top Attraction in ${destination.name}`, rating: 4.5 },
                { id: 2, name: `Famous Landmark`, rating: 4.3 },
                { id: 3, name: `Cultural Site`, rating: 4.7 }
            ];
            return { success: true, places: touristPlaces };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Tourist Places');
        }
    }
};

// Hotels and Accommodation API
const HotelsAPI = {
    getByDestination: (destinationId) => {
        try {
            const hotels = [
                { id: 1, name: 'Luxury Resort & Spa', rating: 4.5, price: 5000, amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'] },
                { id: 2, name: 'Budget Friendly Hotel', rating: 4.0, price: 2000, amenities: ['Restaurant', 'WiFi', 'AC'] },
                { id: 3, name: 'Boutique Heritage Hotel', rating: 4.7, price: 3500, amenities: ['Heritage Architecture', 'Restaurant', 'Cultural Programs'] }
            ];
            return { success: true, hotels: hotels };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Hotels');
        }
    }
};

// Trip Planning API
const TripPlanningAPI = {
    calculateCosts: (tripData, destination) => {
        try {
            const fuelCost = CostCalculator.calculateFuelCost(destination.distance, tripData.mileage, tripData.fuelPrice, tripData.roundTrip);
            const accommodationCost = CostCalculator.calculateAccommodationCost(tripData.travelers);
            const foodCost = CostCalculator.calculateFoodCost(tripData.travelers);
            const miscCost = CostCalculator.calculateMiscCost(tripData.travelers);
            const totalCost = CostCalculator.calculateTotalCost(fuelCost, accommodationCost, foodCost, miscCost, tripData.tollCost);
            return {
                success: true,
                costs: { fuel: fuelCost, accommodation: accommodationCost, tolls: tripData.tollCost || 0, food: foodCost, miscellaneous: miscCost, total: totalCost }
            };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Calculate Trip Costs');
        }
    },

    saveBooking: (bookingData) => {
        try {
            const booking = { id: Date.now(), ...bookingData, createdAt: new Date().toISOString() };
            const bookings = StorageUtils.get('bookings', []);
            bookings.push(booking);
            StorageUtils.set('bookings', bookings);
            return { success: true, booking: booking };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Save Booking');
        }
    },

    getBookings: (userId) => {
        try {
            const bookings = StorageUtils.get('bookings', []);
            return { success: true, bookings: bookings };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Bookings');
        }
    },

    deleteBooking: (bookingId) => {
        try {
            const bookings = StorageUtils.get('bookings', []);
            const updatedBookings = bookings.filter(b => b.id !== parseInt(bookingId));
            StorageUtils.set('bookings', updatedBookings);
            return { success: true, bookings: updatedBookings };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Delete Booking');
        }
    }
};

// OpenWeatherMap API integration
const WeatherAPI = {
    apiKey: '72ea903401a149b0c6f30a8c562d0ac2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',

    async getCurrent(city = 'Delhi') {
        try {
            const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Weather not found');
            const data = await response.json();
            return {
                success: true,
                weather: {
                    location: data.name,
                    temperature: Math.round(data.main.temp),
                    condition: data.weather[0].main,
                    icon: this.mapIcon(data.weather[0].icon)
                }
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    mapIcon(iconCode) {
        const map = {
            '01d': 'fas fa-sun', '01n': 'fas fa-moon', '02d': 'fas fa-cloud-sun', '02n': 'fas fa-cloud-moon',
            '03d': 'fas fa-cloud', '03n': 'fas fa-cloud', '04d': 'fas fa-cloud-meatball', '04n': 'fas fa-cloud-meatball',
            '09d': 'fas fa-cloud-showers-heavy', '09n': 'fas fa-cloud-showers-heavy', '10d': 'fas fa-cloud-sun-rain', '10n': 'fas fa-cloud-moon-rain',
            '11d': 'fas fa-bolt', '11n': 'fas fa-bolt', '13d': 'fas fa-snowflake', '13n': 'fas fa-snowflake', '50d': 'fas fa-smog', '50n': 'fas fa-smog'
        };
        return map[iconCode] || 'fas fa-sun';
    }
};

// TomTom API integration (Updated & Functional)
const TomTomAPI = {
    apiKey: 'AwlbnO5iHWoKWWzkLlQ7jYhjSrdaqrwb',

    geocode: async (address) => {
        try {
            const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${TomTomAPI.apiKey}&countrySet=IN&limit=1`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Geocoding failed');
            const data = await response.json();
            const location = data.results[0]?.position;
            if (!location) throw new Error('No results found');
            return { success: true, location: { lat: location.lat, lng: location.lon } };
        } catch (error) {
            return ErrorUtils.handleError(error, 'TomTom Geocoding');
        }
    },

    findNearbyPlaces: async (location, type, radius = 10000) => {
        // Removed gas_station and charging_station as they now have dedicated functions
        const categoryMap = { restaurant: '7315', cafe: '9376', hotel: '7312', tourist_attraction: '9362', park: '9362007', hindu_temple: '7332003', shopping_mall: '7320', hospital: '9361', gas_station: '7311', charging_station: '7309' };
        try {
            const url = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${TomTomAPI.apiKey}&lat=${location.lat}&lon=${location.lng}&radius=${radius}&categorySet=${categoryMap[type] || type}&limit=10`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Nearby search failed');
            const data = await response.json();
            const places = data.results.map(p => ({ id: p.id, name: p.poi.name, address: p.address.freeformAddress, lat: p.position.lat, lon: p.position.lon, types: p.poi.categories }));
            return { success: true, places };
        } catch (error) {
            return ErrorUtils.handleError(error, `TomTom Nearby Search for ${type}`);
        }
    },

    getNearbyFuelStations: async (location, radius = 10000) => {
        try {
            const url = `https://api.tomtom.com/fuel/2/search/nearby.json?key=${TomTomAPI.apiKey}&lat=${location.lat}&lon=${location.lon}&radius=${radius}&fuelType=petrol`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Fuel station search failed');
            const data = await response.json();
            const places = data.results.map(p => ({ id: p.id, name: p.poi.name, address: p.address.freeformAddress, lat: p.position.lat, lon: p.position.lon, price: p.fuelPrice?.price }));
            return { success: true, places };
        } catch (error) {
            return ErrorUtils.handleError(error, 'TomTom Fuel Stations');
        }
    },

    getNearbyEvStations: async (location, radius = 10000) => {
        try {
            const url = `https://api.tomtom.com/search/2/chargingAvailability.json?key=${TomTomAPI.apiKey}&lat=${location.lat}&lon=${location.lon}&radius=${radius}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('EV station search failed');
            const data = await response.json();
            const places = data.results.map(p => ({ id: p.id, name: p.poi.name, address: p.address.freeformAddress, lat: p.position.lat, lon: p.position.lon, connectors: p.chargingPark?.connectors }));
            return { success: true, places };
        } catch (error) {
            return ErrorUtils.handleError(error, 'TomTom EV Stations');
        }
    },

    search: async (query) => {
        try {
            const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${TomTomAPI.apiKey}&countrySet=IN&typeahead=true&limit=5&entityTypeSet=Municipality`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            const suggestions = data.results.map(result => ({ place_id: result.id, description: result.address.freeformAddress, terms: [{ value: result.address.localName }] }));
            return { success: true, suggestions };
        } catch (error) {
            return ErrorUtils.handleError(error, 'TomTom Search');
        }
    },

    getRouteAndTolls: async (origin, destination) => {
        try {
            const tollCost = Math.floor(Math.random() * 300) + 50;
            return { success: true, tolls: { cost: tollCost } };
        } catch (error) {
            return ErrorUtils.handleError(error, 'TomTom Route & Tolls');
        }
    }
};

// Chatbot API
const ChatbotAPI = {
    getResponse: (message) => {
        const getRecommendationResponse = (query) => {
            let recommendedDestinations = [];
            if (query.includes('cold') || query.includes('snow')) recommendedDestinations = destinations.filter(d => parseInt(d.temperature) <= 15);
            else if (query.includes('hot') || query.includes('beach')) recommendedDestinations = destinations.filter(d => parseInt(d.temperature) > 25);
            if (recommendedDestinations.length > 0) {
                const destinationLinks = recommendedDestinations.slice(0, 3).map(d => `• <a href="#" class="text-blue-600 underline" data-destination-id="${d.id}">${d.name}</a>`).join('\n');
                return `Based on your preference, I recommend these destinations:\n${destinationLinks}\n\nYou can click on any of them to see more details.`;
            }
            return null;
        };

        try {
            const lowerInput = message.toLowerCase();

            if (chatbotResponses.greeting.some(word => lowerInput.includes(word))) return { success: true, response: 'Namaste! Welcome to TripBuddy. I can help you discover incredible Indian destinations, calculate travel costs, and plan perfect trips. What would you like to explore?' };

            if (chatbotResponses.recommend.some(word => lowerInput.includes(word))) {
                const recommendation = getRecommendationResponse(lowerInput);
                if (recommendation) return { success: true, response: recommendation };
                return { success: true, response: 'I recommend these amazing Indian destinations:\n• Goa - Perfect beaches and Portuguese heritage\n• Manali - Snow-capped mountains and adventure sports\n• Udaipur - Royal palaces and City of Lakes\n• Kerala Backwaters - Serene houseboats and nature\n• Rishikesh - Yoga capital and spiritual retreat\n\nWhich type of destination interests you most?' };
            }

            if (chatbotResponses.cost.some(word => lowerInput.includes(word))) return { success: true, response: 'Our smart cost calculator considers:\n• Fuel costs based on distance and car mileage\n• Accommodation estimates (₹2000/person/day)\n• Food expenses (₹1000/person/day)\n• Miscellaneous costs (₹500/person)\n\nJust select a destination, enter your details, and get instant cost estimates!' };

            if (chatbotResponses.booking.some(word => lowerInput.includes(word))) return { success: true, response: 'To create a trip summary:\n1. Choose any destination from our list\n2. Enter your current location and travel details\n3. Select your car model for accurate fuel calculation\n4. Click "Generate Final Trip Summary"\n5. View all summaries in "My Bookings" section\n\nNote: You need to be logged in to save trip summaries.' };

            if (chatbotResponses.weather.some(word => lowerInput.includes(word))) return { success: true, response: 'Our app provides weather-based recommendations:\n• Hot weather (>30°C): Hill stations like Manali, Shimla\n• Cold weather (<10°C): Warm places like Goa, Kerala\n• Pleasant weather: Perfect for Rajasthan palaces\n\nThe weather widget shows current conditions and suggests ideal destinations!' };

            if (chatbotResponses.transport.some(word => lowerInput.includes(word))) return { success: true, response: 'Transportation features:\n• Car database with accurate mileage data\n• Fuel station locations near destinations\n• Local transport options (buses, autos, taxis)\n• Round-trip cost calculations\n• Current fuel price integration\n\nSelect your car model for precise cost estimates!' };

            if (chatbotResponses.help.some(word => lowerInput.includes(word))) return { success: true, response: 'I can help you with:\n• Destination recommendations across India\n• Accurate cost calculations and budgeting\n• Transportation and fuel cost estimates\n• Trip summary generation and saving\n• Weather-based travel suggestions\n• Local transport and facilities info\n\nWhat specific help do you need?' };

            return { success: true, response: 'I\'m here to help you plan amazing trips across India! You can ask me about:\n• Popular destinations and their highlights\n• Cost calculations and budget planning\n• Transportation options and fuel costs\n• Weather-based recommendations\n• How to save and manage trip summaries\n\nWhat would you like to know?' };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Chatbot Response');
        }
    }
};

// Car Database API
const CarAPI = {
    getAll: () => {
        try {
            return { success: true, cars: carDatabase };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Cars');
        }
    },

    getByModel: (model) => {
        try {
            const car = carDatabase.find(c => c.model === model);
            if (!car) throw new Error('Car model not found');
            return { success: true, car: car };
        } catch (error) {
            return ErrorUtils.handleError(error, 'Get Car by Model');
        }
    }
};
