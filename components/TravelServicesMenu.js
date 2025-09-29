	React.useEffect(() => {
		if (bookingPopup && bookingPopup.open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [bookingPopup && bookingPopup.open]);
const { useState } = React;

function TravelServicesMenu({ selectedProp }) {
	const [selected, setSelected] = useState(selectedProp || 'hotels');
	React.useEffect(() => {
		if (selectedProp && selected !== selectedProp) setSelected(selectedProp);
	}, [selectedProp]);

	const [bookingPopup, setBookingPopup] = useState({ open: false, type: '', item: null });
	const [travelDate, setTravelDate] = useState('');
	const [returnDate, setReturnDate] = useState('');
	const [showLoginPrompt, setShowLoginPrompt] = useState(false);
	// Add margin to push content below navbar
	const mainContentClass = "mt-32 sm:mt-28";

	// Simulate user authentication (replace with real auth in production)
	function isUserSignedIn() {
		return !!StorageUtils.get('user');
	}

	function saveBooking(type, item, travelDate, returnDate) {
		const user = StorageUtils.get('user');
		// ...existing code...
	}
	const cabs = [
		{ name: "Ola Sedan", route: "Delhi Local", price: 350, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" },
		{ name: "Uber Premier", route: "Mumbai Local", price: 400, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80" },
		{ name: "Meru Cabs", route: "Bangalore Local", price: 300, image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80" },
		{ name: "Mega Cabs", route: "Chennai Local", price: 320, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" }
	];

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
		},
		{
			name: "SpiceJet",
			route: "Chennai → Kolkata",
			price: 4800,
			image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80"
		},
		{
			name: "Vistara",
			route: "Hyderabad → Delhi",
			price: 5100,
			image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80"
		}
	];

	const buses = [
		{
			name: "Volvo AC Bus",
			route: "Delhi → Jaipur",
			price: 1200,
			image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
		},
		{
			name: "RedBus",
			route: "Mumbai → Pune",
			price: 900,
			image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80"
		},
		{
			name: "KSRTC",
			route: "Bangalore → Mysore",
			price: 850,
			image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
		},
		{
			name: "TNSTC",
			route: "Chennai → Coimbatore",
			price: 1100,
			image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80"
		}
	];

	const trains = [
		{
			name: "Rajdhani Express",
			route: "Delhi → Mumbai",
			price: 2200,
			image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
		},
		{
			name: "Shatabdi Express",
			route: "Chennai → Bangalore",
			price: 1800,
			image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
		},
		{
			name: "Duronto Express",
			route: "Kolkata → Pune",
			price: 2500,
			image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80"
		},
		{
			name: "Garib Rath",
			route: "Hyderabad → Vizag",
			price: 1600,
			image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
		}
	];

	return (
		<>
			{/* Booking Popup */}
			{bookingPopup.open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
						<button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={closeBooking}>&times;</button>
						<h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Book {bookingPopup.type.charAt(0).toUpperCase() + bookingPopup.type.slice(1)}</h2>
						<div className="mb-4">
							<div className="font-semibold mb-2 text-lg text-gray-700">{bookingPopup.item?.name}</div>
							{bookingPopup.item?.route && <div className="mb-2 text-gray-500">{bookingPopup.item.route}</div>}
							{bookingPopup.item?.city && <div className="mb-2 text-gray-500">{bookingPopup.item.city}</div>}
						</div>
						<div className="mb-4 flex gap-4">
							<div className="flex-1">
								<label className="block mb-1 font-medium">Travel Date</label>
								<input type="date" className="w-full border rounded px-3 py-2 text-black bg-white" value={travelDate} onChange={e => setTravelDate(e.target.value)} style={{ colorScheme: 'light' }} />
							</div>
							<div className="flex-1">
								<label className="block mb-1 font-medium">Return Date</label>
								<input type="date" className="w-full border rounded px-3 py-2 text-black bg-white" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ colorScheme: 'light' }} />
							</div>
						</div>
						{showLoginPrompt ? (
							<div className="text-center text-red-600 font-semibold mb-4">Please login to book. <br/> <button className='underline text-blue-700' onClick={() => { closeBooking(); if(window.openLoginModal) window.openLoginModal(); }}>Login Now</button></div>
						) : null}
						<button
							className="w-full py-3 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:scale-105 transition-all mt-2"
							onClick={() => {
								if (!isUserSignedIn()) {
									setShowLoginPrompt(true);
									return;
								}
								saveBooking(bookingPopup.type, bookingPopup.item, travelDate, returnDate);
								ErrorUtils.showToast(`Booking confirmed for ${bookingPopup.item?.name || ''}!`, 'success');
								closeBooking();
							}}
							disabled={!travelDate}
						>
							Book {bookingPopup.type.charAt(0).toUpperCase() + bookingPopup.type.slice(1)}
						</button>
					</div>
				</div>
			)}
						<div className={mainContentClass}></div>
			<div className="mb-10">
				{selected === 'hotels' && (
					<div>
						<h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">Recommended Hotels</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
							{hotels.map((hotel, idx) => (
								<div
									key={idx}
									className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
								>
									<img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-lg mb-4" />
									<h3 className="text-xl font-bold mb-2 text-center text-blue-700">{hotel.name}</h3>
									<p className="text-center text-gray-600 mb-2">{hotel.city}</p>
									<div className="flex items-center justify-center mb-2">
										<span className="text-yellow-500 text-lg mr-2">★</span>
										<span className="font-semibold text-gray-800">{hotel.rating}</span>
									</div>
									<div className="text-lg font-semibold text-green-600 mb-2">₹{hotel.price}</div>
									<button
										className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-colors"
										onClick={() => openBooking('hotel', hotel)}
									>Book Now</button>
								</div>
							))}
						</div>
					</div>
				)}
				{selected === 'flights' && (
					<div>
						<h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Popular Flights</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{flights.map((flight, idx) => (
								<div
									key={idx}
									className="rounded-xl shadow-lg overflow-hidden flex flex-col relative min-h-[260px] group cursor-pointer border border-gray-200 hover:scale-105 transition-transform"
									style={{ backgroundImage: `url('${flight.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
									onClick={() => openBooking('flight', flight)}
									title="Book this flight"
								>
									<div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
									<div className="relative z-10 p-5 flex-1 flex flex-col justify-between h-full">
										<div>
											<h3 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{flight.name}</h3>
											<p className="text-gray-200 mb-2 text-lg">{flight.route}</p>
										</div>
										<div className="mt-auto">
											<span className="text-lg font-bold text-blue-200 bg-black bg-opacity-40 px-3 py-1 rounded-lg">₹{flight.price.toLocaleString()}</span>
											<span className="text-gray-200 text-sm ml-2">per ticket</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{selected === 'buses' && (
					<div>
						<h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Popular Buses</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{buses.map((bus, idx) => (
								<div
									key={idx}
									className="rounded-xl shadow-lg overflow-hidden flex flex-col relative min-h-[260px] group cursor-pointer border border-gray-200 hover:scale-105 transition-transform"
									style={{ backgroundImage: `url('${bus.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
									onClick={() => openBooking('bus', bus)}
									title="Book this bus"
								>
									<div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
									<div className="relative z-10 p-5 flex-1 flex flex-col justify-between h-full">
										<div>
											<h3 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{bus.name}</h3>
											<p className="text-gray-200 mb-2 text-lg">{bus.route}</p>
										</div>
										<div className="mt-auto">
											<span className="text-lg font-bold text-blue-200 bg-black bg-opacity-40 px-3 py-1 rounded-lg">₹{bus.price.toLocaleString()}</span>
											<span className="text-gray-200 text-sm ml-2">per ticket</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{selected === 'trains' && (
					<div>
						<h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Popular Trains</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{trains.map((train, idx) => (
								<div
									key={idx}
									className="rounded-xl shadow-lg overflow-hidden flex flex-col relative min-h-[260px] group cursor-pointer border border-gray-200 hover:scale-105 transition-transform"
									style={{ backgroundImage: `url('${train.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
									onClick={() => openBooking('train', train)}
									title="Book this train"
								>
									<div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
									<div className="relative z-10 p-5 flex-1 flex flex-col justify-between h-full">
										<div>
											<h3 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{train.name}</h3>
											<p className="text-gray-200 mb-2 text-lg">{train.route}</p>
										</div>
										<div className="mt-auto">
											<span className="text-lg font-bold text-blue-200 bg-black bg-opacity-40 px-3 py-1 rounded-lg">₹{train.price.toLocaleString()}</span>
											<span className="text-gray-200 text-sm ml-2">per ticket</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{selected === 'cabs' && (
					<div>
						<h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Popular Cabs</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{cabs.map((cab, idx) => (
								<div
									key={idx}
									className="rounded-xl shadow-lg overflow-hidden flex flex-col relative min-h-[260px] group cursor-pointer border border-gray-200 hover:scale-105 transition-transform"
									style={{ backgroundImage: `url('${cab.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
									onClick={() => openBooking('cab', cab)}
									title="Book this cab"
								>
									<div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
									<div className="relative z-10 p-5 flex-1 flex flex-col justify-between h-full">
										<div>
											<h3 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{cab.name}</h3>
											<p className="text-gray-200 mb-2 text-lg">{cab.route}</p>
										</div>
										<div className="mt-auto">
											<span className="text-lg font-bold text-blue-200 bg-black bg-opacity-40 px-3 py-1 rounded-lg">₹{cab.price.toLocaleString()}</span>
											<span className="text-gray-200 text-sm ml-2">per ride</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{selected === 'others' && (
					<div className="glassmorphism rounded-lg p-8 text-center">
						<i className="fas fa-ellipsis-h text-3xl text-gray-400 mb-2"></i>
						<h2 className="text-2xl font-bold mb-2">Other Services</h2>
						<p>More travel services coming soon!</p>
					</div>
				)}
			</div>
		</>
	);
}

window.TravelServicesMenu = TravelServicesMenu;