// DestinationDetail Component
const DestinationDetail = ({ destination, setCurrentPage, setSelectedDestination, user }) => {
    // Collapsible section state
    const [openSections, setOpenSections] = useState({
        restaurants: true,
        cafes: false,
        hotels: false,
        attractions: false,
        parks: false,
        temples: false,
        malls: false,
        transport: false,
    });

    const toggleSection = (key) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const [tripData, setTripData] = useState({
        travelers: 1,
        carModel: '',
        customMileage: '',
        fuelPrice: 90,
        roundTrip: true,
        date: '',
        currentLocation: ''
    });

    const [costs, setCosts] = useState({
        fuel: 0,
        accommodation: 0,
        food: 0,
        tolls: 0,
        miscellaneous: 0,
        total: 0
    });

    const [fuelStations, setFuelStations] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [cafes, setCafes] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [parks, setParks] = useState([]);
    const [temples, setTemples] = useState([]);
    const [malls, setMalls] = useState([]);
    const [localTransport, setLocalTransport] = useState([]);
    const [showBookingSuccess, setShowBookingSuccess] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showPackingList, setShowPackingList] = useState(false);
    const [travelerType, setTravelerType] = useState('all'); // Added state for traveler type
    const [isLocationLoading, setIsLocationLoading] = useState(true);
    const [showFuelEvMap, setShowFuelEvMap] = useState(false);


    useEffect(() => {
        // This effect runs when the destination changes, to kick off geocoding if needed.
        if (destination) {
            // If destination has no coordinates, start the loading process.
            if (!destination.lat || !destination.lon) {
                setIsLocationLoading(true);
                ensureLatLonAndFetchPlaces();
            } else {
                // If coordinates are already present, we are not loading.
                setIsLocationLoading(false);
                fetchNearbyPlaces({ lat: destination.lat, lng: destination.lon });
                loadTransportData();
            }
        }
    }, [destination]); // Rerun when the destination object itself changes.

    // Ensure destination has lat/lon, otherwise geocode it
    const ensureLatLonAndFetchPlaces = async () => {
        let location = { lat: destination.lat, lng: destination.lon };

        // If lat/lng are missing, geocode the destination name
        // This check is now inside the useEffect, but the function remains for clarity.
        if (destination.name) {
            const geocodeResult = await TomTomAPI.geocode(`${destination.name}, ${destination.state}`);
            if (geocodeResult.success) {
                location = geocodeResult.location;
                // Update the destination object with new coordinates for other components to use
                const updatedDest = { ...destination, lat: location.lat, lon: location.lng };
                setSelectedDestination(updatedDest); // Update parent state
            } else {
                console.error("Geocoding failed for destination:", destination.name);
                return; // Stop if we can't get a location
            }
        }
    };

    // Fetch famous restaurants and fuel stations using Google Maps
    const fetchNearbyPlaces = async (location) => {
        if (!location) return;

        // Fetch all place types in parallel
        const placeTypes = {
            restaurants: 'restaurant',
            cafes: 'cafe',
            hotels: 'hotel',
            attractions: 'tourist_attraction',
            parks: 'park',
            temples: 'hindu_temple',
            malls: 'shopping_mall'
        };

        const setters = { setRestaurants, setCafes, setHotels, setAttractions, setParks, setTemples, setMalls };

        Object.entries(placeTypes).forEach(async ([stateKey, googleType]) => {
            const result = await TomTomAPI.findNearbyPlaces(location, googleType);
            if (result.success) {
                const setterName = `set${stateKey.charAt(0).toUpperCase() + stateKey.slice(1)}`;
                const setter = setters[setterName];
                if (setter) setter(result.places);
            }
        });
    };

    // Filter places based on traveler type
    const filterPlaces = (places, type) => {
        if (type === 'all') return places;

        const lowercaseType = type.toLowerCase();
      
      return places.filter(place => {
            const name = place.name?.toLowerCase() || '';
            const types = place.types?.join(' ')?.toLowerCase() || '';
        
        // Define keyword sets for each traveler type
        const typeKeywords = {
            family: ['park', 'zoo', 'amusement_park', 'playground', 'family', 'kids'],
            couple: ['romantic', 'spa', 'cafe', 'restaurant', 'movie_theater', 'hotel', 'resort'],
            solo: ['museum', 'art_gallery', 'library', 'bookstore', 'cafe', 'historical_site']
        };

            const keywords = typeKeywords[lowercaseType] || [];

            // Check if the place name or types include any of the keywords
            for (const keyword of keywords) {
                if (name.includes(keyword) || types.includes(keyword)) {
                    return true; // Include the place if any keyword matches
                }
            }
            return true;
        });
    };

    const filteredRestaurants = filterPlaces(restaurants, travelerType);
    const filteredHotels = filterPlaces(hotels, travelerType);
    const filteredAttractions = filterPlaces(attractions, travelerType);

    const loadTransportData = async () => {
        try {
            // This is a mock API call, as the original TransportAPI was removed.
            const transport = [
                'Local Bus Service - ₹20/day',
                'Auto Rickshaw - ₹15/km',
                'Taxi Service - ₹12/km',
                'Bike Rental - ₹500/day',
                'Uber/Ola - Available'
            ];
            setLocalTransport(transport);
        } catch (error) {
            console.warn('Failed to load transport data:', error);
        }
    };

    // This effect should be separate to react to tripData changes for cost calculation.
    useEffect(() => {
        if (destination) {
            calculateCosts();
        }
    }, [tripData, destination]);

    const calculateCosts = async () => {
        setIsCalculating(true);
        
        try {
            // Get mileage from car database or use custom
            let mileage = tripData.customMileage;
            if (!mileage && tripData.carModel) {
                const carResult = CarAPI.getByModel(tripData.carModel);
                if (carResult.success) {
                    mileage = carResult.car.mileage;
                }
            }
            if (!mileage) mileage = 15; // Default mileage

            // Fetch toll costs
            let tollCost = 0;
            if (tripData.currentLocation && destination.name) {
                const tollResult = await TomTomAPI.getRouteAndTolls(
                    tripData.currentLocation,
                    `${destination.name}, ${destination.state}`
                );
                if (tollResult.success) {
                    tollCost = tripData.roundTrip ? tollResult.tolls.cost * 2 : tollResult.tolls.cost;
                }
            }

            const costResult = TripPlanningAPI.calculateCosts({
                ...tripData,
                mileage: parseFloat(mileage),
                tollCost: tollCost
            }, destination);

            if (costResult.success) {
                setCosts(costResult.costs);
            }
        } catch (error) {
            console.warn('Cost calculation failed:', error);
        } finally {
            setIsCalculating(false);
        }
    };

    const handleCarModelChange = async (model) => {
        const carResult = CarAPI.getByModel(model);
        const newTripData = { ...tripData, carModel: model, customMileage: '' };
        if (carResult.success) {
            newTripData.customMileage = carResult.car.mileage;
        }
        setTripData(newTripData);
    };

    const handleInputChange = (field, value) => {
        setTripData(prev => ({ ...prev, [field]: value }));
    };

    const generateTripSummary = async () => {
        if (!user) {
            ErrorUtils.showToast('Please login to generate trip summary', 'error');
            return;
        }

        if (!tripData.currentLocation.trim()) {
            ErrorUtils.showToast('Please enter your current location', 'error');
            return;
        }

        if (!tripData.date) {
            ErrorUtils.showToast('Please select a travel date', 'error');
            return;
        }

        try {
            const bookingData = {
                destination: destination.name,
                destinationId: destination.id,
                ...tripData,
                costs: costs,
                userId: user.id
            };

            const result = await TripPlanningAPI.saveBooking(bookingData);
            
            if (result.success) {
                setShowBookingSuccess(true);
                ErrorUtils.showToast('Trip summary generated successfully!', 'success');
                setTimeout(() => setShowBookingSuccess(false), 3000);
            } else {
                ErrorUtils.showToast('Failed to save trip summary', 'error');
            }
        } catch (error) {
            ErrorUtils.showToast('An error occurred while saving', 'error');
        }
    };

    if (!destination) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-gray-400 text-6xl mb-4"></i>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Destination Not Found</h2>
                    <button
                        onClick={() => {
                            setCurrentPage('destinations');
                            setTimeout(() => {
                                if (typeof window !== 'undefined') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }, 0);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        View All Destinations
                    </button>
                </div>
            </div>
        );
    }

    return (
    <div className="min-h-screen bg-gray-50" style={{paddingTop: 0}}>
            {/* Back Button - Top Left, above hero image */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => {
                        setCurrentPage('destinations');
                        setTimeout(() => {
                            if (typeof window !== 'undefined') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }, 0);
                    }}
                    className="bg-white bg-opacity-80 text-gray-900 p-3 rounded-full hover:bg-gray-200 shadow-lg transition-all border border-gray-300"
                    aria-label="Back"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>
            {/* Hero Image */}
            <div className="relative h-96">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
                        <p className="text-xl">{destination.description}</p>
                        <p className="text-lg mt-2 opacity-90">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            {destination.state}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Destination Info */}
                    <div>
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">About This Destination</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {destination.fullDescription}
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <i className="far fa-calendar text-blue-500 text-xl mb-2"></i>
                                    <h4 className="font-semibold text-gray-800">Best Time to Visit</h4>
                                    <p className="text-gray-600">{destination.bestTime}</p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <i className="fas fa-thermometer-half text-orange-500 text-xl mb-2"></i>
                                    <h4 className="font-semibold text-gray-800">Temperature</h4>
                                    <p className="text-gray-600">{destination.temperature}</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Activities</h3>
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                {destination.activities.map((activity, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm"
                                    >
                                        {activity}
                                    </span>
                                ))}
                            </div>

                            {/* Famous Restaurants (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('restaurants')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-utensils text-red-500 mr-2"></i>Famous Restaurants Nearby</span>
                                    <i className={`fas fa-chevron-${openSections.restaurants ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.restaurants && (
                                    <div className="space-y-2">
                                        {filteredRestaurants.length === 0 && <div className="text-gray-400">No restaurants found for this traveler type.</div>}
                                        {filteredRestaurants.map((rest, index) => (
                                            <div key={index} className="bg-red-50 p-3 rounded-lg">
                                                <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>
                                                {rest.name} <span className="text-xs text-gray-500">{rest.address}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cafes (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('cafes')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-coffee text-yellow-600 mr-2"></i>Popular Cafes</span>
                                    <i className={`fas fa-chevron-${openSections.cafes ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.cafes && (
                                    <div className="space-y-2">
                                        {cafes.length === 0 && <div className="text-gray-400">No cafes found.</div>}
                                        {cafes.map((cafe, index) => (
                                            <div key={index} className="bg-yellow-50 p-3 rounded-lg">
                                                <i className="fas fa-map-marker-alt text-yellow-600 mr-2"></i>
                                                {cafe.name} <span className="text-xs text-gray-500">{cafe.address}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Hotels (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('hotels')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-hotel text-purple-500 mr-2"></i>Hotels Nearby</span>
                                    <i className={`fas fa-chevron-${openSections.hotels ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.hotels && (
                                    <div className="space-y-2">
                                        {filteredHotels.length === 0 && <div className="text-gray-400">No hotels found for this traveler type.</div>}
                                        {filteredHotels.map((hotel, index) => (
                                            <div key={index} className="bg-purple-50 p-3 rounded-lg">
                                                <i className="fas fa-map-marker-alt text-purple-600 mr-2"></i>
                                                {hotel.name} <span className="text-xs text-gray-500">{hotel.address}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Tourist Attractions (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('attractions')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-landmark text-blue-500 mr-2"></i>Tourist Attractions</span>
                                    <i className={`fas fa-chevron-${openSections.attractions ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.attractions && (
                                    <div className="space-y-2">
                                        {filteredAttractions.length === 0 && <div className="text-gray-400">No attractions found for this traveler type.</div>}
                                        {filteredAttractions.map((attr, index) => (
                                            <div key={index} className="bg-blue-50 p-3 rounded-lg">
                                                <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                                                {attr.name} <span className="text-xs text-gray-500">{attr.address}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Parks (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('parks')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-tree text-green-700 mr-2"></i>Parks & Gardens</span>
                                    <i className={`fas fa-chevron-${openSections.parks ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.parks && (
                                    <div className="space-y-2">
                                        {parks.length === 0 && <div className="text-gray-400">No parks found.</div>}
                                        {parks.map((park, index) => (
                                            <div key={index} className="bg-green-50 p-3 rounded-lg">
                                                <i className="fas fa-map-marker-alt text-green-700 mr-2"></i>
                                                {park.name} <span className="text-xs text-gray-500">{park.address}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Temples (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('temples')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-om text-orange-600 mr-2"></i>Temples Nearby</span>
                                    <i className={`fas fa-chevron-${openSections.temples ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.temples && (
                                    <div className="space-y-2">
                                        {temples.length === 0 && <div className="text-gray-400">No temples found.</div>}
                                        {temples.map((temple, index) => (
                                            <div key={index} className="bg-orange-50 p-3 rounded-lg">
                                                <i className="fas fa-map-marker-alt text-orange-600 mr-2"></i>
                                                {temple.name} <span className="text-xs text-gray-500">{temple.address}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Malls (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('malls')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-shopping-bag text-pink-600 mr-2"></i>Shopping Malls</span>
                                    <i className={`fas fa-chevron-${openSections.malls ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.malls && (
                                    <div className="space-y-2">
                                        {malls.length === 0 && <div className="text-gray-400">No malls found.</div>}
                                        {malls.map((mall, index) => (
                                            <div key={index} className="bg-pink-50 p-3 rounded-lg">
                                                <i className="fas fa-map-marker-alt text-pink-600 mr-2"></i>
                                                {mall.name} <span className="text-xs text-gray-500">{mall.address}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Local Transport (Collapsible) */}
                            <div className="mb-6">
                                <button type="button" onClick={() => toggleSection('transport')} className="w-full flex items-center justify-between text-xl font-bold text-gray-800 mb-4 focus:outline-none">
                                    <span><i className="fas fa-bus text-purple-500 mr-2"></i>Local Transport Options</span>
                                    <i className={`fas fa-chevron-${openSections.transport ? 'up' : 'down'} text-gray-500 ml-2`}></i>
                                </button>
                                {openSections.transport && (
                                    <div className="space-y-2">
                                        {localTransport.map((transport, index) => (
                                            <div key={index} className="bg-purple-50 p-3 rounded-lg">
                                                <i className="fas fa-route text-purple-600 mr-2"></i>
                                                {transport}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Trip Planner */}
                    <div>
                        <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Plan Your Trip</h2>
                            
                            <div className="space-y-6">
                                {/* Current Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-map-marker-alt mr-1"></i>
                                        Your Current Location
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        value={tripData.currentLocation}
                                        onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Trip Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="far fa-calendar mr-1"></i>
                                        Travel Date
                                    </label>
                                    <input
                                        type="date"
                                        min={DateUtils.getCurrentDate()}
                                        value={tripData.date}
                                        onChange={(e) => handleInputChange('date', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Number of Travelers */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-users mr-1"></i>
                                        Number of Travelers
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={tripData.travelers}
                                        onChange={(e) => handleInputChange('travelers', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Car Model */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-car mr-1"></i>
                                        Car Model
                                    </label>
                                    <select
                                        value={tripData.carModel}
                                        onChange={(e) => handleCarModelChange(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a car model</option>
                                        {carDatabase.map((car, index) => (
                                            <option key={index} value={car.model}>
                                                {car.model} ({car.mileage} km/l)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Custom Mileage */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-tachometer-alt mr-1"></i>
                                        Mileage (km/l)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="5"
                                        max="50"
                                        placeholder="Enter custom mileage"
                                        value={tripData.customMileage}
                                        onChange={(e) => handleInputChange('customMileage', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Fuel Price */}
                                <div className="flex items-end gap-2">
                                    <div className="flex-grow">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <i className="fas fa-rupee-sign mr-1"></i>
                                            Fuel Price (₹/L)
                                        </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="50"
                                        max="150"
                                        value={tripData.fuelPrice}
                                        onChange={(e) => handleInputChange('fuelPrice', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    </div>
                                    {/* Fuel/EV Map Button */}
                                    <button
                                        disabled={isLocationLoading}
                                        onClick={async () => {
                                            if (!destination.lat || !destination.lon) {
                                                // Try to geocode before opening modal
                                                const geocodeResult = await TomTomAPI.geocode(`${destination.name}, ${destination.state}`);
                                                if (geocodeResult.success) {
                                                    setSelectedDestination({ ...destination, lat: geocodeResult.location.lat, lon: geocodeResult.location.lng });
                                                    setTimeout(() => setShowFuelEvMap(true), 300); // Wait for state update
                                                } else {
                                                    ErrorUtils.showToast('Could not determine location for this destination.', 'error');
                                                }
                                            } else {
                                                setShowFuelEvMap(true);
                                            }
                                        }}
                                        className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white p-3 rounded-lg transition-colors"
                                        title="View Fuel & EV Stations Map"
                                    >
                                        <i className="fas fa-map-marked-alt"></i>
                                    </button>
                                </div>

                                {/* Traveler Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-users mr-1"></i>
                                        Traveler Type
                                    </label>
                                    <select
                                        value={travelerType}
                                        onChange={(e) => setTravelerType(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Travelers</option>
                                        <option value="family">Family</option>
                                        <option value="couple">Couple</option>
                                        <option value="solo">Solo</option>
                                    </select>
                                </div>
                                
                                {/* Round Trip Toggle */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="roundTrip"
                                        checked={tripData.roundTrip}
                                        onChange={(e) => handleInputChange('roundTrip', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="roundTrip" className="ml-2 block text-sm text-gray-700">
                                        Round Trip ({destination.distance * 2} km total)
                                    </label>
                                </div>

                                {/* Cost Summary */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-calculator mr-2"></i>
                                        Estimated Budget
                                        {isCalculating && <i className="fas fa-spinner fa-spin ml-2 text-blue-500"></i>}
                                    </h3>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>Distance:</span>
                                            <span>{tripData.roundTrip ? destination.distance * 2 : destination.distance} km</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Fuel Cost:</span>
                                            <span>{StringUtils.formatCurrency(costs.fuel)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Toll Taxes:</span>
                                            <span>{StringUtils.formatCurrency(costs.tolls)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Accommodation ({tripData.travelers} person):</span>
                                            <span>{StringUtils.formatCurrency(costs.accommodation)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Food ({tripData.travelers} person):</span>
                                            <span>{StringUtils.formatCurrency(costs.food)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Miscellaneous:</span>
                                            <span>{StringUtils.formatCurrency(costs.miscellaneous)}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-4">
                                            <div className="flex justify-between text-lg font-bold text-blue-600">
                                                <span>Total Estimated Cost:</span>
                                                <span>{StringUtils.formatCurrency(costs.total)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Generate Trip Summary Button */}
                                <button
                                    onClick={generateTripSummary}
                                    disabled={!user || isCalculating}
                                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
                                >
                                    <i className="fas fa-file-alt mr-2"></i>
                                    Generate Final Trip Summary
                                </button>

                                {!user && (
                                    <p className="text-sm text-gray-500 text-center">
                                        <i className="fas fa-info-circle mr-1"></i>
                                        Please login to save trip summaries
                                    </p>
                                )}

                                {/* Success Message */}
                                {showBookingSuccess && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded animate-pulse">
                                        <i className="fas fa-check-circle mr-2"></i>
                                        Trip summary generated and saved successfully!
                                    </div>
                                )}

                                {/* Packing List Button */}
                                <button
                                    onClick={() => setShowPackingList(true)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 mt-4"
                                >
                                    <i className="fas fa-suitcase-rolling mr-2"></i>
                                    Generate Packing List
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render FuelEvMap modal if showFuelEvMap is true */}
            {showFuelEvMap && (
                <FuelEvMap destination={destination} onClose={() => setShowFuelEvMap(false)} />
            )}

            {/* Render PackingList modal if showPackingList is true */}
            {showPackingList && (
                <PackingList destination={destination} onClose={() => setShowPackingList(false)} />
            )}
        </div>
    );
};