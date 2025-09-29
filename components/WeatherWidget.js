// WeatherWidget Component
const { useState, useEffect } = React;
const WeatherWidget = ({ weather, setWeather }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        initializeWeather();
        // Update weather every 30 minutes
        const interval = setInterval(initializeWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const initializeWeather = async () => {
        try {
            const result = await WeatherAPI.getCurrent();
            if (result.success) {
                setWeather(result.weather);
                setLastUpdated(new Date());
            }
        } catch (error) {
            console.warn('Weather update failed:', error);
        }
    };

    const refreshWeather = async () => {
        await initializeWeather();
        ErrorUtils.showToast('Weather updated!', 'success');
    };

    if (!weather) return null;

    const getWeatherIcon = () => {
        return weather.icon || 'fas fa-sun';
    };

    const getWeatherColor = () => {
        if (weather.temperature > 30) return 'text-red-400';
        if (weather.temperature < 15) return 'text-blue-400';
        return 'text-yellow-400';
    };

    const getWeatherRecommendation = () => {
        return WeatherUtils.getWeatherRecommendation(weather.temperature);
    };

    const getTemperatureRange = () => {
        if (weather.temperature > 30) return 'Very Hot';
        if (weather.temperature > 25) return 'Hot';
        if (weather.temperature > 20) return 'Warm';
        if (weather.temperature > 15) return 'Cool';
        return 'Cold';
    };

    return (
    <div className="fixed top-40 right-6 floating-widget z-40">
            <div
                className={`bg-gradient-to-br from-orange-300 via-pink-400 to-purple-700 bg-opacity-80 border border-white/30 shadow-2xl rounded-2xl cursor-pointer transition-all backdrop-blur-lg ${
                    isExpanded ? 'p-4 w-64' : 'p-2 w-40'
                }`}
                style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.25)'}}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <i className={`${getWeatherIcon()} text-3xl mr-4 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]`}></i>
                        <div>
                            <div className="text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] tracking-wide">{weather.temperature}°C</div>
                            <div className="text-base font-semibold text-white/90 bg-black/30 px-2 py-0.5 rounded-lg shadow-sm mt-1 tracking-wide">{weather.condition}</div>
                        </div>
                    </div>
                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-lg text-white/80 bg-black/30 rounded-full px-2 py-1 shadow`}></i>
                </div>
                
                {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-white/30">
                        <div className="space-y-4">
                            <div className="flex items-center text-base font-bold">
                                <i className="fas fa-map-marker-alt mr-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"></i>
                                <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] tracking-wide">{weather.location}</span>
                            </div>
                            <div className="flex items-center text-base font-bold">
                                <i className="fas fa-thermometer-half mr-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"></i>
                                <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] tracking-wide">Feels {getTemperatureRange()}</span>
                            </div>
                            <div className="text-sm bg-white/20 p-3 rounded-xl border border-white/30 font-semibold text-white shadow-md flex items-center">
                                <i className="fas fa-lightbulb mr-2 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"></i>
                                <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">{getWeatherRecommendation()}</span>
                            </div>
                            {lastUpdated && (
                                <div className="text-xs text-white font-semibold bg-black/30 px-2 py-1 rounded shadow-sm w-fit">
                                    Updated: {lastUpdated.toLocaleTimeString([], { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </div>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    refreshWeather();
                                }}
                                className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-600 hover:from-orange-500 hover:to-purple-700 text-white font-bold py-2 px-3 rounded-xl text-base transition-all border border-white/30 shadow-lg mt-2"
                            >
                                <i className="fas fa-sync mr-2 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"></i>
                                Refresh
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};