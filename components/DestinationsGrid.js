// DestinationsGrid Component
const DestinationsGrid = ({ setCurrentPage, setSelectedDestination, searchData }) => {
    const [filteredDestinations, setFilteredDestinations] = useState(destinations);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [mapView, setMapView] = useState({ isOpen: false, destination: null });

    useEffect(() => {
        filterDestinations();
    }, [searchData, selectedFilter]);

    const filterDestinations = async () => {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let filtered = destinations;

        // Apply search filter
        if (searchData.destination) {
            filtered = SearchUtils.filterDestinations(filtered, searchData.destination);
        }

        // Apply category filter
        if (selectedFilter !== 'all') {
            filtered = SearchUtils.getDestinationsByCategory(filtered, selectedFilter);
        }

        setFilteredDestinations(filtered);
        setIsLoading(false);
    };

    const handleDestinationClick = (destination) => {
        setSelectedDestination(destination);
        setCurrentPage('detail');
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
    };

    const showTouristPlaces = async (destination, event) => {
        event.stopPropagation();
        const result = await DestinationsAPI.getTouristPlaces(destination.id);
        
        if (result.success) {
            const placesText = result.places.map(p => `${p.name} (${p.rating} ⭐)`).join('\n');
            alert(`Popular places in ${destination.name}:\n\n${placesText}`);
        }
    };

    // ...existing code...

    const showAllOnMap = async (destination, event) => {
        event.stopPropagation();
        let destWithCoords = { ...destination };

        // Geocode if lat/lon are missing
        if (!destWithCoords.lat || !destWithCoords.lon) {
            const geocodeResult = await TomTomAPI.geocode(`${destWithCoords.name}, ${destWithCoords.state}`);
            if (geocodeResult.success) {
                destWithCoords.lat = geocodeResult.location.lat;
                destWithCoords.lon = geocodeResult.location.lng;
            } else {
                alert('Could not determine location for this destination to show the map.');
                return;
            }
        }
        setMapView({ isOpen: true, destination: destWithCoords });
    };

    const filters = [
        { key: 'all', label: 'All Destinations', icon: 'fas fa-globe' },
        { key: 'trending', label: 'Trending', icon: 'fas fa-fire' },
        { key: 'aiRecommended', label: 'AI Picks', icon: 'fas fa-robot' },
        { key: 'hot', label: 'Warm Places', icon: 'fas fa-sun' },
        { key: 'cold', label: 'Cool Places', icon: 'fas fa-snowflake' }
    ];

    const renderDestinationCard = (destination) => (
        <div
            key={destination.id}
            className="destination-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
        >
            <div className="relative">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&w=1000&q=80'; }}
                />
                <div className="absolute top-2 right-2">
                    {destination.trending && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold mr-1">
                            TRENDING
                        </span>
                    )}
                    {destination.aiRecommended && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            AI PICK
                        </span>
                    )}
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {destination.state}
                </div>
            </div>
            
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{destination.name}</h3>
                <p className="text-gray-600 mb-3 text-sm">
                    {StringUtils.truncateText(destination.description, 80)}
                </p>
                
                <div className="space-y-2">
                    <div className="flex space-x-2">
                        <button
                            onClick={(e) => showAllOnMap(destination, e)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm transition-colors"
                        >
                            <i className="fas fa-map mr-1"></i>
                            Show on Map
                        </button>
                        <button
                            onClick={() => handleDestinationClick(destination)}
                            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded text-sm transition-colors"
                        >
                            <i className="fas fa-calculator mr-1"></i>
                            Plan Trip
                        </button>
                    </div>
                    <div className="flex space-x-2 text-xs justify-around pt-1">
                        <a onClick={(e) => showTouristPlaces(destination, e)} className="text-gray-500 hover:text-blue-600 cursor-pointer">Attractions</a>
                    </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mt-3 pt-3 border-t">
                    <span>
                        <i className="far fa-calendar mr-1"></i>
                        {destination.bestTime}
                    </span>
                    <span>
                        <i className="fas fa-thermometer-half mr-1"></i>
                        {destination.temperature}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-12" style={{paddingTop: '8rem'}}>
        <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Indian Destinations</h2>
                <p className="text-xl text-gray-600">Discover incredible places across India</p>
            </div>

            {/* Filters with Back to Search at the leftmost position if searching */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 items-center">
                {searchData.destination && (
                    <button
                        onClick={() => {
                            setCurrentPage('home');
                            setTimeout(() => {
                                if (typeof window !== 'undefined') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }, 0);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors shadow border border-gray-300 text-sm order-first"
                        aria-label="Back to Search"
                        style={{ minWidth: '140px' }}
                    >
                        <i className="fas fa-arrow-left mr-1"></i>
                        Back to Search
                    </button>
                )}
                {filters.map((filter) => (
                    <span key={filter.key} className="flex items-center">
                        <button
                            onClick={() => setSelectedFilter(filter.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                selectedFilter === filter.key
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-blue-100'
                            }`}
                        >
                            <i className={`${filter.icon} mr-1`}></i>
                            {filter.label}
                        </button>
                    </span>
                ))}
            </div>

            {/* Show search result chip if searching */}
            {searchData.destination && (
                <div className="text-center mb-6">
                    <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        <i className="fas fa-search mr-2"></i>
                        Results for "{searchData.destination}"
                    </div>
                </div>
            )}


                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                        <p className="text-gray-600">Loading destinations...</p>
                    </div>
                )}

                {/* No Results */}
                {!isLoading && filteredDestinations.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fas fa-search text-gray-400 text-6xl mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No destinations found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                        <button
                            onClick={() => {
                                setSelectedFilter('all');
                                // Clear search if needed
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Show All Destinations
                        </button>
                    </div>
                )}

                {/* Results */}
                {!isLoading && filteredDestinations.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredDestinations.map(renderDestinationCard)}
                        </div>
                    </div>
                )}

            </div>

            {/* Render AllPlacesMap modal */}
            {mapView.isOpen && (
                <AllPlacesMap destination={mapView.destination} onClose={() => setMapView({ isOpen: false, destination: null })} />
            )}
        </div>
    );
};