// TripBuddy Main App
const { useState } = React;

const App = () => {
	React.useEffect(() => {
		if (showAuthModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [showAuthModal]);
	const [currentPage, _setCurrentPage] = useState('home');
	// Wrapper to always scroll to top
	const setCurrentPage = (page) => {
		_setCurrentPage(page);
		setTimeout(() => {
			if (typeof window !== 'undefined') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}, 0);
	};
	const [user, setUser] = useState(null);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [searchData, setSearchData] = useState({ destination: '', date: '', travelers: 1 });
	const [selectedDestination, setSelectedDestination] = useState(null);
	const [alternatives, setAlternatives] = useState([]);
	const [weather, setWeather] = useState(null);
	const [chatbotOpen, setChatbotOpen] = useState(false);

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
				user={user}
			/>
		);
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

	return (
		<>
			<Navbar
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				user={user}
				setUser={setUser}
				setShowAuthModal={setShowAuthModal}
			/>
			<div
				style={{
					paddingTop: '8rem',
					minHeight: '100vh',
					boxSizing: 'border-box',
					background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
				}}
			>
				{showAuthModal && (
					<AuthModal
						isOpen={showAuthModal}
						setIsOpen={setShowAuthModal}
						setUser={setUser}
					/>
				)}
				{pageContent}
				{/* TripBuddy Assistant (Chatbot) - above Emergency Alert icon, bottom left */}
				<div style={{position: 'fixed', bottom: '10rem', left: '2rem', zIndex: 50}}>
					<Chatbot isOpen={chatbotOpen} setIsOpen={setChatbotOpen} />
				</div>
				{/* Weather Widget - previous Chatbot position, bottom right */}
				<div style={{position: 'fixed', bottom: '4rem', right: '2rem', zIndex: 50}}>
					<WeatherWidget weather={weather} setWeather={setWeather} />
				</div>
			</div>
		</>
	);
};

// Mount the app
ReactDOM.render(<App />, document.getElementById('root'));
