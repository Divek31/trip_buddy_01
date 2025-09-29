    React.useEffect(() => {
        if (props.isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [props.isModalOpen]);
// AlternativesPage Component
const AlternativesPage = ({ alternatives, setCurrentPage, setSelectedDestination }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAlternativeClick = async (destination) => {
        setIsLoading(true);
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setSelectedDestination(destination);
        setCurrentPage('detail');
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
        setIsLoading(false);
    };

    const continueToDestinations = () => {
        setCurrentPage('destinations');
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
    };

    const goBackToHome = () => {
        setCurrentPage('home');
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
    };

    if (!alternatives || alternatives.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-orange-500 text-6xl mb-4"></i>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">No Alternatives Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find weather-based alternatives at this time.</p>
                    <button
                        onClick={continueToDestinations}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        View All Destinations
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 pt-20 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <i className="fas fa-thermometer-half text-orange-500 text-6xl mb-4"></i>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Weather-Based Alternatives</h2>
                    <p className="text-xl text-gray-600 mb-4">
                        We found better destinations based on current weather conditions
                    </p>
                    <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                        <i className="fas fa-lightbulb mr-2"></i>
                        Smart weather recommendations for better travel experience
                    </div>
                </div>

                {/* Alternatives Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {alternatives.map((destination) => (
                        <div
                            key={destination.id}
                            className="destination-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105"
                            onClick={() => handleAlternativeClick(destination)}
                        >
                            <div className="relative">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    <i className="fas fa-cloud-sun mr-1"></i>
                                    WEATHER PICK
                                </div>
                                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                    {destination.state}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
                                <p className="text-gray-600 mb-4">{destination.description}</p>
                                
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                                        <i className="far fa-calendar text-blue-500 text-lg mb-1"></i>
                                        <div className="text-xs text-gray-600">Best Time</div>
                                        <div className="text-sm font-semibold">{destination.bestTime}</div>
                                    </div>
                                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                                        <i className="fas fa-thermometer-half text-orange-500 text-lg mb-1"></i>
                                        <div className="text-xs text-gray-600">Temperature</div>
                                        <div className="text-sm font-semibold">{destination.temperature}</div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {destination.activities.slice(0, 2).map((activity, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                        >
                                            {activity}
                                        </span>
                                    ))}
                                    {destination.activities.length > 2 && (
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            +{destination.activities.length - 2} more
                                        </span>
                                    )}
                                </div>
                                
                                <button
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all"
                                >
                                    {isLoading ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-route mr-2"></i>
                                            Plan This Trip
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={continueToDestinations}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                    >
                        <i className="fas fa-list mr-2"></i>
                        Continue to All Destinations
                    </button>
                    
                    <button
                        onClick={goBackToHome}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Search
                    </button>
                </div>

                {/* Weather Info */}
                <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                            Why These Recommendations?
                        </h3>
                        <p className="text-gray-600">
                            Our AI analyzes current weather conditions and suggests destinations that offer 
                            the best experience based on temperature, season, and local climate patterns. 
                            These alternatives are specially curated for optimal comfort and enjoyment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};