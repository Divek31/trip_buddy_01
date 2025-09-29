// components/NearbyPlacesMap.js

const NearbyPlacesMap = ({ title, places, destination, onClose }) => {
    const { useEffect, useRef, useState } = React;
    const mapRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!destination?.lat || !destination?.lon) {
            setError("Destination location is not available.");
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
            new tomtom.Marker({ color: '#FF0000' })
                .setLngLat(location)
                .setPopup(new tomtom.Popup({ offset: 30 }).setText(`Destination: ${destination.name}`))
                .addTo(map);

            // Add markers for the nearby places
            if (places && places.length > 0) {
                places.forEach(place => {
                    new tomtom.Marker()
                        .setLngLat([place.lon, place.lat])
                        .setPopup(new tomtom.Popup({ offset: 30 }).setText(place.name))
                        .addTo(map);
                });
            }
        } else {
            setError("Map SDK not loaded.");
        }
    }, [destination, places]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        <i className="fas fa-map-marked-alt mr-2 text-blue-500"></i>
                        {title} near {destination.name}
                    </h2>
                </div>

                {error && <div className="text-center text-red-500 py-12">{error}</div>}

                {!error && (
                    <div
                        ref={mapRef}
                        className="bg-gray-200 rounded-lg overflow-hidden shadow-inner w-full h-80"
                    >
                        {/* Map will render here */}
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

window.NearbyPlacesMap = NearbyPlacesMap;