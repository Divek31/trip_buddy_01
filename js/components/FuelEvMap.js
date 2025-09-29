// ...existing code...
const FuelEvMap = ({ destination, onClose }) => {
    const { useState, useEffect, useRef } = React;
    const [fuelStations, setFuelStations] = useState([]);
    const [evStations, setEvStations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const leafletMapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        if (!destination?.lat || !destination?.lon) {
            setError("Destination location is not available to show map.");
            setIsLoading(false);
            return;
        }

        // Use Leaflet + Geoapify tiles for map rendering
        if (window.L && mapRef.current) {
            const location = { lat: destination.lat, lon: destination.lon };
            // Remove previous map instance if exists
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
            }
            // Create Leaflet map
            const map = window.L.map(mapRef.current, { zoomControl: true, attributionControl: true });
            leafletMapRef.current = map;
            // Add Geoapify tile layer
            window.L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?apiKey=a04fcfaa3d96469f9a868afb5c0d2bb1`, {
                attribution: '© OpenMapTiles © OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(map);
            // Add marker for destination
            const destMarker = window.L.marker([location.lat, location.lon], { icon: window.L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [32, 32], iconAnchor: [16, 32] }) });
            destMarker.addTo(map).bindPopup(`<strong>${destination.name || 'Destination'}</strong>`).openPopup();
            setMapLoaded(true);
            fetchStations(map, { lat: location.lat, lon: location.lon });
        } else {
            setError("Leaflet or Geoapify map tiles not loaded. Please check your internet connection.");
            setIsLoading(false);
        }
    }, [destination]);

    const fetchStations = async (map, location, sdk) => {
        setIsLoading(true);
        setError(null);

        // Validate coordinates before making API calls
        if (
            location.lat == null || location.lon == null ||
            isNaN(location.lat) || isNaN(location.lon)
        ) {
            setError("Invalid destination coordinates. Please select a valid location.");
            setIsLoading(false);
            return;
        }

        const createMarker = (place, color, iconClass, popupText) => {
            if (place.lat == null || place.lon == null || isNaN(place.lat) || isNaN(place.lon)) return;
            // Use Leaflet marker with custom color/icon
            const markerIcon = window.L.divIcon({
                className: '',
                html: `<div style="background:${color};border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;"><i class='${iconClass}' style='color:white;font-size:14px;'></i></div>`
            });
            const marker = window.L.marker([place.lat, place.lon], { icon: markerIcon });
            marker.addTo(map).bindPopup(popupText);
        };

        try {
            // Use Geoapify for both fuel and EV stations, try multiple EV categories
            const [fuelResult, ev1, ev2, ev3] = await Promise.all([
                window.GeoapifyAPI.getPlaces(location.lat, location.lon, 'service.vehicle.fuel'),
                window.GeoapifyAPI.getPlaces(location.lat, location.lon, 'service.vehicle.electric'),
                window.GeoapifyAPI.getPlaces(location.lat, location.lon, 'service.vehicle.charging'),
                window.GeoapifyAPI.getPlaces(location.lat, location.lon, 'electric_vehicle_charging_station')
            ]);

            // Fuel stations
            let allMarkers = [];
            if (fuelResult.success) {
                setFuelStations(fuelResult.places);
                fuelResult.places.forEach(p => {
                    createMarker(p, '#22c55e', 'fas fa-gas-pump', `<strong>${p.name}</strong><br/>${p.address}`);
                    allMarkers.push([p.lat, p.lon]);
                });
            } else {
                setFuelStations([]);
                console.warn('No fuel stations found:', fuelResult.error);
            }

            // Merge all EV results
            let evStationsArr = [];
            [ev1, ev2, ev3].forEach(evRes => {
                if (evRes.success && Array.isArray(evRes.places)) {
                    evStationsArr = evStationsArr.concat(evRes.places);
                }
            });
            // Remove duplicates by lat/lon
            const uniqueEvStations = [];
            const seen = new Set();
            evStationsArr.forEach(st => {
                const key = `${st.lat},${st.lon}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueEvStations.push(st);
                }
            });

            setEvStations(uniqueEvStations);
            if (uniqueEvStations.length > 0) {
                uniqueEvStations.forEach(p => {
                    createMarker(p, '#2563eb', 'fas fa-charging-station', `<strong>${p.name}</strong><br/>${p.address}`);
                    allMarkers.push([p.lat, p.lon]);
                });
            } else {
                console.warn('No EV stations found in any category.');
            }

            // Center and zoom map to show all markers
            if (allMarkers.length > 0 && map) {
                const bounds = window.L.latLngBounds(allMarkers);
                map.fitBounds(bounds, { padding: [40, 40] });
            }
        } catch (err) {
            setError("Failed to fetch station data. The API limit may have been reached or the service is unavailable.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStationList = (stations, title, icon) => (
        <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                <i className={`${icon} mr-2`}></i>
                {title} <span className="ml-1 text-xs text-gray-500">({stations.length})</span>
            </h4>
            <ul className="space-y-2 text-sm h-32 overflow-y-auto pr-2">
                {stations.length > 0 ? stations.map((station, index) => (
                    <li key={station.id || index} className="text-gray-700 truncate" title={station.name}>
                        <span className="font-semibold text-base">{station.name}</span>
                        <span className="block text-xs text-gray-500">{station.address}</span>
                    </li>
                )) : (
                    <li className="text-gray-400 flex flex-col items-center py-4">
                        <i className="fas fa-exclamation-circle text-blue-400 text-2xl mb-2"></i>
                        <span>No stations found nearby.</span>
                        {title === 'EV Charging Stations' && (
                            <span className="text-xs text-gray-500 mt-1">Try searching in a larger city or check with local authorities for EV infrastructure.</span>
                        )}
                    </li>
                )}
            </ul>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        <i className="fas fa-map-marked-alt mr-2 text-blue-500"></i>
                        Fuel & EV Stations near <span className="text-blue-700">{destination.name}</span>
                    </h2>
                </div>

                {error && <div className="text-center text-red-500 py-12">{error}</div>}

                {!error && (
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div>
                            <div ref={mapRef} className="bg-gray-200 rounded-lg overflow-hidden shadow-inner mb-4 w-full h-80 relative">
                                {(!mapLoaded || isLoading) && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-10">
                                        <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            {renderStationList(fuelStations, 'Fuel Stations', 'fas fa-gas-pump text-green-500')}
                            <div className="border-t my-4"></div>
                            {renderStationList(evStations, 'EV Charging Stations', 'fas fa-charging-station text-blue-500')}
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

window.FuelEvMap = FuelEvMap;
// ...existing code...