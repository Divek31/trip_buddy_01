// TripBuddy Main App
const { useState } = React;



const App = () => {
	const [currentPage, setCurrentPage] = useState('home');
	const [user, setUser] = useState(null);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [searchData, setSearchData] = useState({ destination: '', date: '', travelers: 1 });
	const [selectedDestination, setSelectedDestination] = useState(null);
	const [alternatives, setAlternatives] = useState([]);
	const [weather, setWeather] = useState(null);
	const [chatbotOpen, setChatbotOpen] = useState(false);
	const [showLoginPopup, setShowLoginPopup] = useState(true);
	const [selectedTravelService, setTravelServiceSelected] = useState('hotels');

	// Expose setter for navbar to use
	window.setTravelServiceSelected = (service) => {
		setTravelServiceSelected(service);
		window.selectedTravelService = service;
	};

	// Render the correct page/component
	let pageContent = null;
	if (currentPage === 'home') {
		pageContent = (
			<Hero
				searchData={searchData}
				setSearchData={setSearchData}
				setCurrentPage={setCurrentPage}
				weather={weather}
				setAlternatives={setAlternatives}
			/>
		);
	} else if (currentPage === 'services') {
		pageContent = <window.TravelServicesMenu selectedProp={selectedTravelService} />;
	} else if (currentPage === 'destinations') {
		pageContent = (
			<DestinationsGrid
				setCurrentPage={setCurrentPage}
				setSelectedDestination={setSelectedDestination}
				searchData={searchData}
			/>
		);
	} else if (currentPage === 'detail') {
		pageContent = (
			<DestinationDetail
				destination={selectedDestination}
				setCurrentPage={setCurrentPage}
				setSelectedDestination={setSelectedDestination} // This line is crucial
				user={user}
			/>
		);
	} else if (currentPage === 'hotels') {
		pageContent = <HotelsPage onBack={() => setCurrentPage('home')} />;
	} else if (currentPage === 'bookings') {
		pageContent = <BookingsPage user={user} />;
	} else if (currentPage === 'alternatives') {
		pageContent = (
			<AlternativesPage
				alternatives={alternatives}
				setCurrentPage={setCurrentPage}
				setSelectedDestination={setSelectedDestination}
			/>
		);
	}

	// Show login popup on first load
	const handleLogin = (mobile) => {
		setUser({ mobile });
		setShowLoginPopup(false);
	};

	return (
		<LanguageProvider>
			<>
				<Navbar
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					user={user}
					setUser={setUser}
					setShowAuthModal={setShowAuthModal}
				/>
				{showAuthModal && (
					<AuthModal
						isOpen={showAuthModal}
						setIsOpen={setShowAuthModal}
						setUser={setUser}
					/>
				)}
				<WeatherWidget weather={weather} setWeather={setWeather} />
				{pageContent}

				<LoginPopup
					isOpen={showLoginPopup && !user}
					onClose={() => setShowLoginPopup(false)}
					onLogin={handleLogin}
					imageUrl="/login-visual.jpg" // Replace with your image path
				/>

				<Chatbot isOpen={chatbotOpen} setIsOpen={setChatbotOpen} />
				<Footer />

				{/* EmergencyButton always visible, pass weather and fetchWeather */}
				{window.EmergencyButton && (
					<window.EmergencyButton weather={weather} fetchWeather={() => {}} />
				)}
			</>
		</LanguageProvider>
	);
};

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
