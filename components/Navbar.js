// Navbar Component
const { useState, useRef, useEffect } = React;
const Navbar = ({ currentPage, setCurrentPage, user, setUser, setShowAuthModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const threeDotsRef = useRef(null);

    // Helper to get Gravatar URL
    function getGravatarUrl(email) {
        if (!email) return null;
        const hash = window.md5 ? window.md5(email.trim().toLowerCase()) : null;
        return hash ? `https://www.gravatar.com/avatar/${hash}?d=identicon` : null;
    }

    // Default images
    const guestImage = '/profile-guest.png'; // You should add this image to your public folder
    const defaultProfileImage = '/profile-default.jpg';
    useEffect(() => {
        if (!isProfileOpen) return;
        function handleClick(e) {
            if (!e.target.closest('.profile-dropdown') && !e.target.closest('.profile-btn')) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isProfileOpen]);

    useEffect(() => {
        if (!isMenuOpen) return;
        function handleClick(e) {
            if (threeDotsRef.current && !threeDotsRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isMenuOpen]);
    const { language, setLanguage, t } = React.useContext(LanguageContext);


    const handleLogout = () => {
        AuthAPI.logout();
        setUser(null);
        setCurrentPage('home');
    };

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
    };

    const navLinks = [
        { name: t('home'), page: 'home' },
        { name: t('destinations'), page: 'destinations' },
        { name: t('my_bookings'), page: 'bookings' },
        { name: 'Flights', page: 'services', icon: 'fas fa-plane', serviceKey: 'flights' },
        { name: 'Hotels', page: 'services', icon: 'fas fa-hotel', serviceKey: 'hotels' },
        { name: 'Trains', page: 'services', icon: 'fas fa-train', serviceKey: 'trains' },
        { name: 'Buses', page: 'services', icon: 'fas fa-bus', serviceKey: 'buses' },
    ];

    return (
    <nav className="w-full shadow-md" style={{ backgroundColor: '#1976d2' }}>
            <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-12">
                <div className="flex justify-between items-center h-24 min-h-[6rem]">
                    
                    <div className="flex-shrink-0">
                        <span
                            className="cursor-pointer select-none flex items-center gap-2"
                            onClick={() => handleNavClick('home')}
                        >
                            <svg width="70" height="48" viewBox="0 0 70 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                                <rect x="2" y="8" width="66" height="36" rx="10" fill="#FDE68A" stroke="#374151" strokeWidth="2"/>
                                <polygon points="35,12 50,36 20,36" fill="#4B5563" />
                                <ellipse cx="35" cy="32" rx="13" ry="6" fill="#34D399" />
                                <rect x="10" y="20" width="8" height="12" rx="3" fill="#065F46" />
                                <rect x="52" y="22" width="6" height="10" rx="2" fill="#065F46" />
                                <rect x="20" y="26" width="4" height="6" rx="1.5" fill="#065F46" />
                                <rect x="44" y="28" width="3" height="5" rx="1" fill="#065F46" />
                            </svg>
                            <span className="font-extrabold text-2xl" style={{ color: '#222', textShadow: '2px 2px 8px #fff, 0 0 2px #1976d2', marginLeft: '0.5rem' }}>TripBuddy</span>
                        </span>
                    </div>
                    
                    <div className="hidden md:flex items-center justify-center flex-grow">
                        <ul className="flex flex-nowrap items-baseline space-x-4 ml-12">
                            {navLinks.map((link) => (
                                <button
                                    key={link.page + (link.serviceKey || '')}
                                    onClick={() => {
                                        if (link.serviceKey) {
                                            if (window.setTravelServiceSelected) {
                                                window.setTravelServiceSelected(link.serviceKey);
                                            }
                                            handleNavClick('services');
                                        } else {
                                            handleNavClick(link.page);
                                        }
                                    }}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                        (currentPage === link.page && !link.serviceKey) || (currentPage === 'services' && window.selectedTravelService === link.serviceKey)
                                            ? 'bg-white text-[#1976d2]'
                                            : 'bg-[#1976d2] text-white hover:bg-[#1565c0] hover:text-white'
                                    }`}
                                >
                                    {link.icon && <i className={`${link.icon}`}></i>}
                                    {link.name}
                                </button>
                            ))}
                        </ul>
                        {/* Three dots option at the end of nav */}
                        <div className="relative hidden md:flex ml-2" ref={threeDotsRef}>
                            <button
                                className="px-3 py-2 rounded-md text-sm font-medium transition-colors items-center gap-2 bg-[#1976d2] text-white hover:bg-[#1565c0] hover:text-white"
                                title="More options"
                                onClick={() => setIsMenuOpen(prev => !prev)}
                            >
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 z-30 border border-gray-100">
                                    <button
                                        className="block w-full text-left px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100"
                                        onClick={() => {
                                            if (window.setTravelServiceSelected) {
                                                window.setTravelServiceSelected('others');
                                            }
                                            handleNavClick('services');
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Other Services
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    
                    <div className="hidden md:flex items-center space-x-4">

                        
                        <div className="flex items-center space-x-2">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-[#1565c0] text-white px-3 py-2 rounded-md text-sm focus:outline-none"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिन्दी</option>
                            </select>
                            <button
                                className="flex items-center px-3 py-2 rounded-md bg-yellow-400 text-gray-900 font-semibold text-sm shadow hover:bg-yellow-300 transition-colors focus:outline-none"
                                style={{ marginLeft: '0.5rem' }}
                                title="Upgrade to Premium"
                                onClick={() => alert('Upgrade coming soon!')}
                            >
                                <i className="fas fa-star text-yellow-600 mr-1"></i>
                                Upgrade<span className="ml-1">⭐</span>
                            </button>
                        </div>

                        {user ? (
                            <div className="relative">
                                <button className="flex items-center space-x-2 text-white profile-btn" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                    {(() => {
                                        // Prefer user.profileImage, then Gravatar, then default
                                        if (user.profileImage) {
                                            return <img src={user.profileImage} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow" />;
                                        } else if (user.email) {
                                            const gravatar = getGravatarUrl(user.email);
                                            if (gravatar) return <img src={gravatar} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow" />;
                                        }
                                        return <img src={defaultProfileImage} alt="Default Profile" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow" />;
                                    })()}
                                    <span>{user.name}</span>
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-100 profile-dropdown">
                                        <div className="px-4 py-2 text-gray-700 flex items-center gap-2 font-semibold border-b">
                                            <span className="text-lg">👤</span> User / Profile
                                        </div>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setIsProfileOpen(false)}>
                                            <span>✏️</span> Edit Profile
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setIsProfileOpen(false)}>
                                            <span>⭐</span> Reviews
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setIsProfileOpen(false)}>
                                            <span>🔔</span> Notifications
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setIsProfileOpen(false)}>
                                            <span>🎁</span> Rewards / Referral
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setIsProfileOpen(false)}>
                                            <span>⚙️</span> Settings
                                        </a>
                                        <a href="#" onClick={() => { setIsProfileOpen(false); handleLogout(); }} className="block px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2 font-semibold border-t mt-1">
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <img src={guestImage} alt="Guest" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow" />
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="bg-white text-[#1976d2] px-4 py-2 rounded-md transition-colors font-semibold hover:bg-gray-100"
                                >
                                    {t('login')}
                                </button>
                            </div>
                        )}
                    </div>

                    
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#1565c0] hover:bg-opacity-90 focus:outline-none"
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>

            
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <button
                                key={link.page}
                                onClick={() => handleNavClick(link.page)}
                                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${
                                    currentPage === link.page
                                        ? 'bg-white text-[#1976d2]'
                                        : 'text-white hover:bg-[#1565c0] hover:bg-opacity-90'
                                }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

window.Navbar = Navbar;