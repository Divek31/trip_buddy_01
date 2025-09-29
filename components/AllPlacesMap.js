    React.useEffect(() => {
        if (props.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [props.isOpen]);
// components/AllPlacesMap.js

const AllPlacesMap = ({ destination, onClose }) => {
    const { useState, useEffect, useRef } = React;
    const [places, setPlaces] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);

    const placeCategories = {
        'Restaurants': { category: 'restaurant', icon: 'fas fa-utensils', color: 'red' },
        'Hotels': { category: 'hotel', icon: 'fas fa-hotel', color: 'purple' },
        'Attractions': { category: 'tourist_attraction', icon: 'fas fa-landmark', color: 'blue' },
        'Parks': { category: 'park', icon: 'fas fa-tree', color: 'green' },
    };

    useEffect(() => {
        if (!destination?.lat || !destination?.lon) {
            setError("Destination location is not available to show the map.");
            setIsLoading(false);
            return;
        }

        if (window.tomtom && mapRef.current) {
            const location = { lat: destination.lat, lng: destination.lon };
            const map = tomtom.map({
                key: TomTomAPI.apiKey,
                container: mapRef.current,
                center: location,
                zoom: 12,
            });

            // Add a marker for the destination
            new tomtom.Marker({ color: '#000000' })
                .setLngLat(location)
                .setPopup(new tomtom.Popup({ offset: 30 }).setText(`Destination: ${destination.name}`))
                .addTo(map);

            fetchAndDisplayPlaces(map, { lat: location.lat, lon: location.lng });
        } else {
            setError("TomTom Maps SDK is not loaded. Please check your API key and internet connection.");
            setIsLoading(false);
        }
    }, [destination]);

    const fetchAndDisplayPlaces = async (map, location) => {
        setIsLoading(true);
        const allPlaces = {};

        const createMarker = (place, color) => {
            const markerElement = document.createElement('div');
            markerElement.className = `w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center`;
            markerElement.style.backgroundColor = color;
            markerElement.innerHTML = `<i class=\"fas fa-map-marker-alt text-white text-xs\"></i>`;

            new tomtom.Marker({ element: markerElement })
                .setLngLat([place.lon, place.lat])
                .setPopup(new tomtom.Popup({ offset: 25 }).setText(place.name))
                .addTo(map);
        };

        // Map our categories to Geoapify categories
        const geoapifyCategoryMap = {
            'restaurant': 'catering.restaurant',
            'hotel': 'accommodation.hotel',
            'tourist_attraction': 'tourism.sights',
            'park': 'leisure.park',
        };
        try {
            const promises = Object.entries(placeCategories).map(async ([title, { category, color }]) => {
                if (window.GeoapifyAPI && window.GeoapifyAPI.getPlaces) {
                    let geoCategory = geoapifyCategoryMap[category] || category;
                    try {
                        console.log(`[AllPlacesMap] Fetching places for ${title} using category:`, geoCategory);
                        let geoResult = await window.GeoapifyAPI.getPlaces(location.lat, location.lon, geoCategory);
                        console.log(`[AllPlacesMap] GeoapifyAPI.getPlaces(${geoCategory}) result:`, geoResult);
                        if (geoResult.success && geoResult.places.length > 0) {
                            allPlaces[title] = { places: geoResult.places };
                            geoResult.places.forEach(p => createMarker(p, color));
                        } else {
                            let errorMsg = geoResult.error || 'No results from Geoapify.';
                            allPlaces[title] = { error: errorMsg, places: [] };
                            console.warn(`[AllPlacesMap] No places found for ${title}:`, errorMsg);
                        }
                    } catch (apiError) {
                        allPlaces[title] = { error: `Geoapify API error: ${apiError.message}`, places: [] };
                        console.error(`[AllPlacesMap] Error fetching ${title}:`, apiError);
                    }
                } else {
                    allPlaces[title] = { error: 'Geoapify API not available', places: [] };
                    console.error(`[AllPlacesMap] Geoapify API not available for ${title}`);
                }
            });
            await Promise.all(promises);
            setPlaces(allPlaces);
        } catch (err) {
            setError("Failed to fetch nearby places data. The API limit may have been reached or there was a network error.");
            console.error("[AllPlacesMap] General error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderPlaceList = (title) => {
        const { icon, color } = placeCategories[title];
        const data = places[title] || { places: [] };
        const placeList = data.places || [];
        return (
            <div>
                <h4 className={`text-md font-semibold text-gray-700 mb-2 flex items-center text-${color}-500`}>
                    <i className={`${icon} mr-2`}></i>
                    {title} ({placeList.length})
                </h4>
                <ul className="space-y-1 text-xs h-20 overflow-y-auto pr-2">
                    {placeList.length > 0 ? placeList.map((place, index) => (
                        <li key={place.id || index} className="text-gray-600 truncate" title={place.name}>
                            {place.name}
                        </li>
                    )) : (
                        <li className="text-gray-400">
                            No {title.toLowerCase()} found.
                            {data.error && (
                                <span className="block text-xs text-red-500 mt-1">{data.error}</span>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    <i className="fas fa-map-marked-alt mr-2 text-blue-500"></i>
                    Points of Interest near {destination.name}
                </h2>

                {error && <div className="text-center text-red-500 py-12">{error}</div>}

                {!error && (
                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        <div className="md:col-span-2">
                            <div ref={mapRef} className="bg-gray-200 rounded-lg overflow-hidden shadow-inner w-full h-96 relative">
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
                                        <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            {Object.keys(placeCategories).map(title => renderPlaceList(title))}
                        </div>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

window.AllPlacesMap = AllPlacesMap;