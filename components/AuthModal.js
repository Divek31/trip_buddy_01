// AuthModal Component
const AuthModal = ({ isOpen, setIsOpen, setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '' 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation Fix
        if (!ValidationUtils.isValidEmail(formData.email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        if (!isLogin && !formData.name.trim()) {
            setError('Please enter your full name');
            setIsLoading(false);
            return;
        }

        try {
            const result = isLogin 
                ? await AuthAPI.login(formData.email, formData.password)
                : await AuthAPI.register(formData.name, formData.email, formData.password);

            if (result.success) {
                setUser(result.user);
                setIsOpen(false);
                setFormData({ name: '', email: '', password: '' });
                ErrorUtils.showToast(`${isLogin ? 'Login' : 'Registration'} successful!`, 'success');
            } else {
                setError(result.error || 'Authentication failed');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glassmorphism rounded-lg p-8 max-w-md w-full mx-4 relative">
                <h2 className="text-2xl font-bold text-white mb-6">
                    <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                    {isLogin ? 'Login to TripBuddy' : 'Join TripBuddy'}
                </h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                <i className="fas fa-user mr-1"></i>
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30 focus:border-blue-400 focus:outline-none transition-colors"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            <i className="fas fa-envelope mr-1"></i>
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30 focus:border-blue-400 focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            <i className="fas fa-lock mr-1"></i>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30 focus:border-blue-400 focus:outline-none transition-colors"
                            required
                            minLength="6"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                {isLogin ? 'Logging in...' : 'Creating account...'}
                            </>
                        ) : (
                            <>
                                <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                                {isLogin ? 'Login' : 'Create Account'}
                            </>
                        )}
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <button
                        onClick={toggleAuthMode}
                        className="text-blue-300 hover:text-blue-100 transition-colors"
                        disabled={isLoading}
                    >
                        {isLogin 
                            ? "Don't have an account? Create one" 
                            : "Already have an account? Login"
                        }
                    </button>
                </div>
                
                <button
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};