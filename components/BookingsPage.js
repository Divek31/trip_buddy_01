// Removed invalid top-level useEffect that caused white screen
// BookingsPage Component
const BookingsPage = ({ user }) => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        loadBookings();
    }, [user]);

    const loadBookings = async () => {
        setIsLoading(true);
        try {
            if (user) {
                const result = await TripPlanningAPI.getBookings(user.id);
                if (result.success) {
                    setBookings(result.bookings);
                }
            }
        } catch (error) {
            console.warn('Failed to load bookings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteBooking = async (bookingId) => {
        try {
            const result = await TripPlanningAPI.deleteBooking(bookingId);
            if (result.success) {
                setBookings(result.bookings);
                setShowDeleteConfirm(false);
                setSelectedBooking(null);
                ErrorUtils.showToast('Booking deleted successfully', 'success');
            } else {
                ErrorUtils.showToast('Failed to delete booking', 'error');
            }
        } catch (error) {
            ErrorUtils.showToast('An error occurred while deleting', 'error');
        }
    };

    const shareBooking = (booking) => {
        const shareText = `Check out my trip to ${booking.destination}!\n\nTravel Date: ${DateUtils.formatDate(booking.date)}\nTravelers: ${booking.travelers}\nTotal Cost: ${StringUtils.formatCurrency(booking.costs?.total || booking.totalCost)}\n\nPlanned with TripBuddy`;
        
        if (navigator.share) {
            navigator.share({
                title: `Trip to ${booking.destination}`,
                text: shareText
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                ErrorUtils.showToast('Trip details copied to clipboard!', 'success');
            });
        }
    };

    const getBookingStatusColor = (booking) => {
        const travelDate = new Date(booking.date);
        const today = new Date();
        const diffTime = travelDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'from-gray-500 to-gray-600'; // Past
        if (diffDays <= 7) return 'from-green-500 to-green-600'; // Upcoming
        return 'from-blue-500 to-purple-600'; // Future
    };

    const getBookingStatusText = (booking) => {
        const travelDate = new Date(booking.date);
        const today = new Date();
        const diffTime = travelDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Completed';
        if (diffDays === 0) return 'Today!';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays <= 7) return `In ${diffDays} days`;
        return `${diffDays} days away`;
    };

    const sortBookingsByDate = (bookings) => {
        return [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-lock text-gray-400 text-6xl mb-4"></i>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Login</h2>
                    <p className="text-gray-600 mb-6">You need to login to view your trip summaries.</p>
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
                        <i className="fas fa-info-circle mr-2"></i>
                        Login to save and manage your travel plans
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-blue-600 text-4xl mb-4"></i>
                    <p className="text-gray-600">Loading your trip summaries...</p>
                </div>
            </div>
        );
    }

    const sortedBookings = sortBookingsByDate(bookings);

    return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">My Trip Summaries</h2>
                    <p className="text-xl text-gray-600">Your saved travel plans and cost estimates</p>
                    
                    {sortedBookings.length > 0 && (
                        <div className="mt-6 inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                            <i className="fas fa-suitcase mr-2"></i>
                            {sortedBookings.length} trip{sortedBookings.length !== 1 ? 's' : ''} planned
                        </div>
                    )}
                </div>

                {sortedBookings.length === 0 ? (
                    <div className="text-center py-12">
                        <i className="fas fa-map text-gray-400 text-6xl mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No Trip Summaries Yet</h3>
                        <p className="text-gray-600 mb-8">Start planning your trips to see summaries here!</p>
                        
                        <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">How to create a trip summary:</h4>
                            <div className="text-left space-y-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">1</span>
                                    Choose a destination
                                </div>
                                <div className="flex items-center">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">2</span>
                                    Enter your travel details
                                </div>
                                <div className="flex items-center">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">3</span>
                                    Generate trip summary
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className={`bg-gradient-to-r ${getBookingStatusColor(booking)} p-6 text-white`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{booking.destination}</h3>
                                            <p className="text-blue-100">
                                                <i className="far fa-calendar mr-2"></i>
                                                {DateUtils.formatDate(booking.date)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold">
                                                {getBookingStatusText(booking)}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {booking.currentLocation && (
                                        <p className="text-blue-100 text-sm mt-2">
                                            <i className="fas fa-map-marker-alt mr-1"></i>
                                            From: {booking.currentLocation}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="p-6">
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>
                                                <i className="fas fa-users mr-2 text-blue-500"></i>
                                                Travelers:
                                            </span>
                                            <span className="font-semibold">{booking.travelers}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span>
                                                <i className="fas fa-car mr-2 text-green-500"></i>
                                                Car:
                                            </span>
                                            <span className="font-semibold">{booking.carModel || 'Custom'}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span>
                                                <i className="fas fa-gas-pump mr-2 text-orange-500"></i>
                                                Mileage:
                                            </span>
                                            <span className="font-semibold">{booking.customMileage || booking.mileage} km/l</span>
                                        </div>
                                        
                                        {booking.costs && (
                                            <div className="pt-2 border-t">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Fuel:</span>
                                                    <span>{StringUtils.formatCurrency(booking.costs.fuel)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Accommodation:</span>
                                                    <span>{StringUtils.formatCurrency(booking.costs.accommodation)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Food:</span>
                                                    <span>{StringUtils.formatCurrency(booking.costs.food)}</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="border-t pt-3 mt-3">
                                            <div className="flex justify-between text-lg font-bold text-green-600">
                                                <span>Total Cost:</span>
                                                <span>{StringUtils.formatCurrency(booking.costs?.total || booking.totalCost)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 flex space-x-2">
                                        <button
                                            onClick={() => shareBooking(booking)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition-colors text-sm"
                                        >
                                            <i className="fas fa-share mr-1"></i>
                                            Share
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setShowDeleteConfirm(true);
                                            }}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition-colors text-sm"
                                        >
                                            <i className="fas fa-trash mr-1"></i>
                                            Delete
                                        </button>
                                    </div>
                                    
                                    {booking.createdAt && (
                                        <div className="mt-3 text-xs text-gray-400 text-center">
                                            Created: {DateUtils.formatDate(booking.createdAt)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="text-center">
                                <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Trip Summary?</h3>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete your trip to <strong>{selectedBooking.destination}</strong>? 
                                    This action cannot be undone.
                                </p>
                                
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => {
                                            setShowDeleteConfirm(false);
                                            setSelectedBooking(null);
                                        }}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => deleteBooking(selectedBooking.id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        <i className="fas fa-trash mr-1"></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistics */}
                {sortedBookings.length > 0 && (
                    <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            <i className="fas fa-chart-bar mr-2"></i>
                            Travel Statistics
                        </h3>
                        
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <i className="fas fa-map-marked-alt text-blue-500 text-2xl mb-2"></i>
                                <div className="text-2xl font-bold text-blue-600">{sortedBookings.length}</div>
                                <div className="text-sm text-gray-600">Trips Planned</div>
                            </div>
                            
                            <div className="bg-green-50 p-4 rounded-lg">
                                <i className="fas fa-rupee-sign text-green-500 text-2xl mb-2"></i>
                                <div className="text-2xl font-bold text-green-600">
                                    {StringUtils.formatCurrency(
                                        sortedBookings.reduce((sum, booking) => 
                                            sum + (booking.costs?.total || booking.totalCost || 0), 0
                                        )
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">Total Budget</div>
                            </div>
                            
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <i className="fas fa-users text-purple-500 text-2xl mb-2"></i>
                                <div className="text-2xl font-bold text-purple-600">
                                    {sortedBookings.reduce((sum, booking) => 
                                        sum + parseInt(booking.travelers || 0), 0
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">Total Travelers</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};