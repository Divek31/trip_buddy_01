// LoginPopup Component (Makemytrip style)
const { useState } = React;

const LoginPopup = ({ isOpen, onClose, onLogin, imageUrl = 'login.jpg' }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);


  const handleLogin = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    onLogin(mobile);
  };

  const handleEmailLogin = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onLogin(email);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col sm:flex-row w-full max-w-2xl mx-2 overflow-hidden relative animate-fadeIn">
        {/* Left Image */}
        <div className="hidden sm:block sm:w-1/2 bg-gray-100">
          <img src={"login.jpg"} alt="Login Visual" className="w-full h-full object-cover" />
        </div>
        {/* Right Form */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col justify-center relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl focus:outline-none">
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Login or Signup</h2>
          <p className="text-gray-500 mb-6 text-sm">Enter your mobile number to continue</p>
          {!showEmail ? (
            <>
              <div className="flex items-center mb-3">
                <span className="inline-block bg-gray-100 border border-gray-300 rounded-l-lg px-4 py-3 text-lg text-gray-700 select-none">+91</span>
                <input
                  type="tel"
                  maxLength="10"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full border border-gray-300 rounded-r-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-all mb-4"
                onClick={handleLogin}
              >
                Continue
              </button>
              <div className="text-center mb-4">
                <span
                  className="text-green-700 hover:underline cursor-pointer font-semibold text-base"
                  onClick={() => {
                    setError("");
                    onLogin("guest");
                  }}
                >
                  <i className="fas fa-user mr-1"></i>Continue as Guest
                </span>
              </div>
              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-400 text-sm">Or Login/Signup With</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-blue-700 py-3 rounded-lg font-semibold text-lg transition-all mb-2 flex items-center justify-center"
                onClick={() => setShowEmail(true)}
              >
                <i className="fas fa-envelope mr-2"></i> Sign in by Email
              </button>
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-all mb-2"
                onClick={handleEmailLogin}
              >
                Continue
              </button>
              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-blue-700 py-2 rounded-lg font-semibold text-base transition-all mb-2"
                onClick={() => setShowEmail(false)}
              >
                <i className="fas fa-mobile-alt mr-2"></i> Sign in by Mobile
              </button>
            </>
          )}
          <p className="text-xs text-gray-400 mt-4 text-center">
            By proceeding, you agree to TripBuddy's <a href="#" className="underline hover:text-blue-500">Privacy Policy</a>, <a href="#" className="underline hover:text-blue-500">User Agreement</a> and <a href="#" className="underline hover:text-blue-500">T&amp;Cs</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

window.LoginPopup = LoginPopup;
