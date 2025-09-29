// HotelsPage Component: Shows a list of top hotels with images, price, and rating
const HotelsPage = ({ onBack }) => {
  // Example static data; replace with real API data if needed
  const hotels = [
    {
      name: "The Taj Mahal Palace",
      city: "Mumbai",
      price: 18000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "The Oberoi Udaivilas",
      city: "Udaipur",
      price: 25000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "ITC Grand Chola",
      city: "Chennai",
      price: 14000,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Leela Palace",
      city: "New Delhi",
      price: 22000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "JW Marriott",
      city: "Bengaluru",
      price: 16000,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Example static data for flights and buses
  const flights = [
    {
      name: "IndiGo",
      route: "Delhi → Mumbai",
      price: 4500,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Air India",
      route: "Bangalore → Goa",
      price: 5200,
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80"
    }
  ];
  const buses = [
    {
      name: "Volvo AC Bus",
      route: "Delhi → Jaipur",
      price: 900,
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sleeper Coach",
      route: "Mumbai → Pune",
      price: 700,
      image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <button onClick={onBack} className="mb-6 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg">
        <i className="fas fa-arrow-left mr-2"></i>Back
      </button>

      {/* Top Hotels Section */}
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Top Hotels in India</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {hotels.map((hotel, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={hotel.image} alt={hotel.name} className="h-48 w-full object-cover" />
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
              <p className="text-gray-500 mb-2">{hotel.city}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1"><i className="fas fa-star"></i></span>
                <span className="font-semibold mr-2">{hotel.rating}</span>
                <span className="text-gray-400">/ 5</span>
              </div>
              <div className="mt-auto">
                <span className="text-lg font-bold text-blue-700">₹{hotel.price.toLocaleString()}</span>
                <span className="text-gray-500 text-sm ml-2">per night</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flights Section */}
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Popular Flights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {flights.map((flight, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={flight.image} alt={flight.name} className="h-40 w-full object-cover" />
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-1">{flight.name}</h3>
              <p className="text-gray-500 mb-2">{flight.route}</p>
              <div className="mt-auto">
                <span className="text-lg font-bold text-blue-700">₹{flight.price.toLocaleString()}</span>
                <span className="text-gray-500 text-sm ml-2">per ticket</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buses Section */}
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Popular Buses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {buses.map((bus, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={bus.image} alt={bus.name} className="h-40 w-full object-cover" />
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-1">{bus.name}</h3>
              <p className="text-gray-500 mb-2">{bus.route}</p>
              <div className="mt-auto">
                <span className="text-lg font-bold text-blue-700">₹{bus.price.toLocaleString()}</span>
                <span className="text-gray-500 text-sm ml-2">per ticket</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.HotelsPage = HotelsPage;
