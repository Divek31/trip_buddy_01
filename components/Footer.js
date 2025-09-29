// TripBuddy Footer Component (Makemytrip style)
const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 pt-12 pb-6 mt-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      {/* Company Info */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-white">TripBuddy</h3>
        <p className="mb-4 text-gray-400">Your AI-powered travel companion for smarter, easier, and more affordable trips across India.</p>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-blue-400"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-blue-400"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      {/* Quick Links */}
      <div>
        <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-400">Home</a></li>
          <li><a href="#" className="hover:text-blue-400">Destinations</a></li>
          <li><a href="#" className="hover:text-blue-400">Plan Your Trip</a></li>
          <li><a href="#" className="hover:text-blue-400">Bookings</a></li>
          <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
        </ul>
      </div>
      {/* Popular Services */}
      <div>
        <h4 className="font-semibold mb-3 text-white">Popular Services</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-400">Flights</a></li>
          <li><a href="#" className="hover:text-blue-400">Hotels</a></li>
          <li><a href="#" className="hover:text-blue-400">Trains</a></li>
          <li><a href="#" className="hover:text-blue-400">Cabs</a></li>
          <li><a href="#" className="hover:text-blue-400">Holiday Packages</a></li>
        </ul>
      </div>
      {/* Contact & App */}
      <div>
        <h4 className="font-semibold mb-3 text-white">Contact & App</h4>
        <ul className="space-y-2">
          <li><i className="fas fa-envelope mr-2"></i> support@tripbuddy.com</li>
          <li><i className="fas fa-phone mr-2"></i> +91 98765 43210</li>
        </ul>
        <div className="mt-4">
          <h5 className="font-semibold mb-2 text-white">Get our app</h5>
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            <a href="#" className="inline-block"><img src="./playstore.png" alt="Play Store" className="h-10" /></a>
            <a href="#" className="inline-block"><img src="./appstore.png" alt="App Store" className="h-10" /></a>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm px-2">
      &copy; {new Date().getFullYear()} TripBuddy. All rights reserved. | Inspired by INSAN.HTML
    </div>
  </footer>
);

// Make Footer globally available
window.Footer = Footer;
