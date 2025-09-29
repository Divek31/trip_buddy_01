const { useState } = React;

function CategoryCard({ icon, title, desc, image, onClick }) {
	return (
		<div
			className="rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl bg-cover bg-center relative min-h-[220px]"
			onClick={onClick}
			style={{ backgroundImage: `url('${image}')` }}
		>
			<div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>
			<div className="relative z-10 flex flex-col items-center">
				<div className="text-5xl mb-3">{icon}</div>
				<h3 className="text-xl font-bold mb-2 text-center text-white drop-shadow-lg">{title}</h3>
				<p className="text-center opacity-90 text-sm text-white drop-shadow-lg">{desc}</p>
			</div>
		</div>
	);
}

const Hero = ({ searchData, setSearchData, setCurrentPage, weather, setAlternatives }) => {
	const { t } = React.useContext(LanguageContext);
	const fullText = t('hero_title');
	const [typedText, setTypedText] = useState("");
	const [inputValue, setInputValue] = useState("");
	const inputRef = React.useRef(null);
	const [showAllCategories, setShowAllCategories] = useState(false);
	const categoryRef = React.useRef(null);

	// 4K travel/nature images
	const bgImages = [
		{
			url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=3840&q=100",
			navGradient: "from-green-700 via-green-400 to-green-200"
		},
		{
			url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=3840&q=100",
			navGradient: "from-blue-900 via-blue-400 to-blue-200"
		},
		{
			url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=3840&q=100",
			navGradient: "from-yellow-800 via-yellow-400 to-yellow-200"
		},
		{
			url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=3840&q=100",
			navGradient: "from-emerald-900 via-emerald-400 to-emerald-200"
		},
		{
			url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=100",
			navGradient: "from-cyan-900 via-cyan-400 to-cyan-200"
		}
	];
	const [bgObj] = useState(() => bgImages[Math.floor(Math.random() * bgImages.length)]);
	const bgImage = bgObj.url;
	React.useEffect(() => {
		document.body.dataset.navGradient = bgObj.navGradient;
	}, [bgObj]);


	const handleAiDecideClick = () => {
        if (categoryRef.current) {
            categoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


	// Typing animation
	React.useEffect(() => {
		setTypedText("");
		let i = 0; 
		const interval = setInterval(() => {
			setTypedText((prev) => {
				if (i < fullText.length) {
					i++;
					return fullText.slice(0, i);
				} else {
					clearInterval(interval);
					return prev;
				}
			});
		}, 70);
		return () => clearInterval(interval);
	}, [fullText]);

	// Google Places Autocomplete setup
	const [suggestions, setSuggestions] = useState([]);

	React.useEffect(() => {
		if (!inputValue) {
			setSuggestions([]);
			return;
		}

		const fetchSuggestions = async () => {
			const result = await TomTomAPI.search(inputValue);
			if (result.success && result.suggestions) {
				setSuggestions(result.suggestions);
			} else {
				setSuggestions([]);
			}
		};

		const debounce = setTimeout(fetchSuggestions, 300); // Debounce API calls
		return () => clearTimeout(debounce);
	}, [inputValue]);

	const handleSuggestionClick = (suggestion) => {
		setInputValue(suggestion.description);
		setSuggestions([]);
		setSearchData((prev) => ({ ...prev, destination: suggestion.description }));
		setCurrentPage('destinations');
		setTimeout(() => {
			if (typeof window !== 'undefined') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}, 0);
		// Optionally, fetch weather for this city
		if (window.WeatherAPI) {
			const city = suggestion.terms[0].value;
			window.WeatherAPI.getCurrent(city).then((result) => {
				if (result.success && window.setWeather) {
					window.setWeather(result.weather);
				}
			});
		}
	};

	const handleCategoryClick = (category) => {
        setSearchData((prev) => ({ ...prev, destination: category }));
		setCurrentPage('destinations');
		setTimeout(() => {
			if (typeof window !== 'undefined') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}, 0);
		
    };


	// Top Places in India data
	const topPlaces = [
		{
			name: "Taj Mahal",
			location: "Agra, Uttar Pradesh",
			image: "taj-mahal-agra-india-unesco-world-heritage-site-wonders-of-5400x3638-2327.jpg",
			description: "💖 The Taj Mahal is pure magic! Let the shimmering marble and fragrant gardens sweep you into a fairytale of love. Watch the sunrise paint the monument in gold, and feel the romance in every breeze. Every step is a story, every view a masterpiece—this is India’s crown jewel, waiting to dazzle your heart.",
		},
		{
			name: "Gateway of India",
			location: "Mumbai, Maharashtra",
			image: "gateway of india.jpg",
			description: "🌊 The Gateway of India is Mumbai’s heartbeat! Feel the ocean breeze, hear the laughter of crowds, and see the city sparkle around you. Take a boat ride, snap a perfect photo, and let the vibrant energy fill you with excitement. Every moment here is a celebration—come join the party!",
		},
		{
			name: "Qutub Minar",
			location: "Delhi",
			image: "qutub minar.jpg",
			description: "🏛️ Qutub Minar is a tower of legends! Stand in awe beneath its ancient stones, trace the delicate carvings, and imagine the stories whispered through time. The gardens are peaceful, the history is rich, and every moment feels like a journey into India’s glorious past. Adventure and wonder await!",
		},
		{
			name: "Amber Fort",
			location: "Jaipur, Rajasthan",
			image: "amber fort .jpg",
			description: "👑 Amber Fort is a palace of dreams! Wander through sparkling mirror halls, golden gates, and secret tunnels. Feel the thrill of royal history, gaze out over Jaipur’s pink cityscape, and let your imagination run wild. Every stone glows with adventure—this is where legends come alive!",
		},
		{
			name: "Backwaters of Kerala",
			location: "Alleppey, Kerala",
			image: "backwater.jpg",
			description: "🚤 Kerala’s backwaters are pure bliss! Drift on a houseboat, watch the sunset shimmer on the water, and let the gentle waves lull you into relaxation. Palm trees, birdsong, and delicious food create a paradise for your senses. Escape the ordinary—this is nature’s embrace, peaceful and unforgettable.",
		},
		{
			name: "Golden Temple",
			location: "Amritsar, Punjab",
			image: "golden temple.jpg",
			description: "✨ The Golden Temple glows with warmth and wonder! See the golden walls shimmer, hear the chants echo, and feel the peace in your soul. Share a meal, make a wish, and let the kindness of Amritsar’s people fill your heart. This is a place of light, love, and unforgettable memories.",
		},
	];

	return (
		<div className="relative min-h-screen flex items-center justify-center" style={{
			backgroundImage: `url('${bgImage}')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}}>
			{/* Overlay for darkening image, optional */}
			<div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
			<div className="text-center text-white z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
				<h1 className="text-6xl font-bold mb-4">
					{typedText}
					<span className="border-r-2 border-white animate-pulse ml-1">&nbsp;</span>
				</h1>
				<div className="flex flex-col items-center mb-8 relative w-full max-w-md mx-auto">
					<div className="flex w-full gap-2">
						<input
							ref={inputRef}
							type="text"
							className="flex-1 px-8 py-5 rounded-full text-black text-2xl focus:outline-none shadow-2xl border-2 border-purple-400 text-center"
							style={{
								minWidth: '350px',
								maxWidth: '600px',
								background: 'linear-gradient(90deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)',
								border: '2px solid #a78bfa',
								boxShadow: '0 4px 24px 0 rgba(130, 87, 229, 0.15)',
								color: '#000',
								fontWeight: 700
							}}
							placeholder={t('search_placeholder')}
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							autoComplete="off"
						/>
						<button
							className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-lg border-2 border-white hover:from-pink-400 hover:to-indigo-400 transition-all"
							title="Search Destination"
							onClick={() => {
								if (inputValue.trim()) {
									setSearchData((prev) => ({ ...prev, destination: inputValue.trim() }));
									setCurrentPage('destinations');
									setTimeout(() => {
										if (typeof window !== 'undefined') {
											window.scrollTo({ top: 0, behavior: 'smooth' });
										}
									}, 0);
								}
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
								<circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2"/>
								<path d="M21 21L16.65 16.65" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
							</svg>
						</button>
					</div>
					{/* AI Recommendation Button */}
					<div className="mt-6 text-center">
						<p className="text-lg opacity-80 mb-2">{t('ai_decide_text')}</p>
						<button
							onClick={handleAiDecideClick}
							className="bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-300 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:from-indigo-600 hover:to-cyan-400 transition-all duration-200 flex items-center justify-center gap-2 text-xl tracking-wide border-2 border-blue-300 hover:border-cyan-400"
							style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '1px' }}
						>
							<i className="fas fa-robot text-2xl text-cyan-100 mr-2"></i>
							{t('ai_decide_button')}
						</button>
					</div>
					{suggestions.length > 0 && (
						<ul className="absolute top-14 left-0 w-full bg-white text-black rounded-lg shadow-lg z-20">
							{suggestions.map((s, idx) => (
								<li
									key={s.place_id}
									className="px-5 py-3 cursor-pointer hover:bg-blue-100 border-b last:border-b-0"
									onClick={() => handleSuggestionClick(s)}
								>
									{s.description}
								</li>
							))}
						</ul>
					)}
				</div>
				<p className="text-xl mb-8 opacity-90">
					{t('hero_subtitle')}
				</p>
				{/* Travel Services Horizontal Menu */}
				{/* Remove TravelServicesMenu from homepage Hero section */}
				{/* Top Places in India Section */}
				<div className="mb-10">
					<h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">Top Places in India</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{topPlaces.map((place, idx) => (
							<div
								key={idx}
								className="rounded-xl shadow-lg overflow-hidden flex flex-col relative min-h-[320px] group cursor-pointer border-2 border-white hover:border-blue-400 transition-transform bg-cover bg-center"
								style={{ backgroundImage: `url('${place.image}')` }}
							>
								<div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
								<div className="relative z-10 flex flex-col justify-center items-center h-full p-6">
									<h3 className="text-4xl font-extrabold mb-2 text-white drop-shadow-lg text-center">{place.name}</h3>
									<p className="text-lg text-blue-100 mb-2 text-center font-semibold">{place.location}</p>
									<p className="text-base text-gray-100 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center bg-black bg-opacity-80 rounded-xl px-4 py-3 absolute bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 pointer-events-none">
										{place.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Travel Categories Card Section */}
				<div ref={categoryRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* Primary Categories */}
					<CategoryCard onClick={() => handleCategoryClick("Adventure")} icon="🧗" title={t('adventure')} desc="Thrilling experiences for adrenaline seekers." image="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=60" />
					<CategoryCard onClick={() => handleCategoryClick("Religious Places")} icon="🛕" title={t('religious')} desc="Sacred temples, mosques, and churches." image="https://images.unsplash.com/photo-1587799194345-35368c193793?auto=format&fit=crop&w=800&q=60" />
					<CategoryCard onClick={() => handleCategoryClick("Historical & Heritage")} icon="🏰" title={t('historical')} desc="Explore India's rich history and forts." image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=60" />
					<CategoryCard onClick={() => handleCategoryClick("Nature & Wildlife")} icon="🌲" title={t('nature')} desc="National parks and wildlife sanctuaries." image="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=60" />
					<CategoryCard onClick={() => handleCategoryClick("Beaches")} icon="🏖️" title={t('beaches')} desc="Relax on beautiful beaches along the coast." image="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=60" />
					<CategoryCard onClick={() => handleCategoryClick("Food & Culture")} icon="🍲" title={t('food_culture')} desc="Experience diverse cuisines and cultures." image="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=60" />
					<CategoryCard onClick={() => handleCategoryClick("Hill Stations")} icon="⛰️" title={t('hill_stations')} desc="Escape to cool and scenic mountain towns." image="https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=800&q=60" />

					{/* "More" button to expand */}
					<CategoryCard
						onClick={() => setShowAllCategories(!showAllCategories)}
						icon={showAllCategories ? "🔼" : "➕"}
						title={showAllCategories ? "Show Less" : "More Categories"}
						desc={showAllCategories ? "Click to hide extra categories." : "Click to see more travel options."}
						image="https://images.unsplash.com/photo-1534777367048-3e534372BCB6?auto=format&fit=crop&w=800&q=60"
					/>

					{/* Secondary Categories - shown on expand */}
					{showAllCategories && (
						<>
							<CategoryCard onClick={() => handleCategoryClick("Deserts")} icon="🏜️" title={t('deserts')} desc="Camel rides, sand dunes, and festivals." image="https://images.unsplash.com/photo-1638024510305-c36fcc0bf3b1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwZHVuZXN8ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("Lakes & Rivers")} icon="🏞️" title={t('lakes_rivers')} desc="Boating, rafting, and scenic towns." image="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("Islands")} icon="🏝️" title={t('islands')} desc="Exotic getaways with crystal-clear waters." image="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("Urban Escapes")} icon="🏙️" title={t('urban_escapes')} desc="Vibrant cities, nightlife, and attractions." image="https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("Villages")} icon="🏡" title={t('villages')} desc="Rural tourism and cultural immersion." image="https://images.unsplash.com/photo-1620766165522-6354b6a63360?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("Wellness")} icon="🧘" title={t('wellness')} desc="Yoga retreats, meditation centers, and spas." image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("Festivals")} icon="🎉" title={t('festivals')} desc="Colorful festivals and cultural celebrations." image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("Road Trips")} icon="🚗" title={t('road_trips')} desc="Iconic highways and scenic mountain routes." image="https://images.unsplash.com/photo-1568605117036-5fe5e7185743?auto=format&fit=crop&w=800&q=60" />
							<CategoryCard onClick={() => handleCategoryClick("International")} icon="🌍" title={t('international')} desc="Explore global destinations." image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

// Make Hero globally available for in-browser Babel
window.Hero = Hero;
