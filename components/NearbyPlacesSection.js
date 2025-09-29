// components/NearbyPlacesSection.js

const NearbyPlacesSection = ({ title, icon, places, onShowMap, color = 'gray' }) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold text-gray-800 flex items-center`}>
                    <i className={`${icon} text-${color}-500 mr-2`}></i>
                    {title}
                </h3>
                <button
                    onClick={onShowMap}
                    disabled={!places || places.length === 0}
                    className={`text-sm text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline`}
                >
                    View on Map
                </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {places && places.length > 0 ? (
                    places.map((place, index) => (
                        <div key={index} className={`bg-${color}-50 p-3 rounded-lg`}>
                            <i className={`fas fa-map-marker-alt text-${color}-600 mr-2`}></i>
                            {place.name} <span className="text-xs text-gray-500">{place.address}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">No {title.toLowerCase()} found nearby.</div>
                )}
            </div>
        </div>
    );
};