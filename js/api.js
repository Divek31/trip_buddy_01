// OpenWeatherMap API integration for TripBuddy
// Usage: WeatherAPI.getCurrent(cityName)

const WeatherAPI = {
  apiKey: '72ea903401a149b0c6f30a8c562d0ac2', // User's actual OpenWeatherMap API key
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather',

  // Get current weather for a city (returns { success, weather })
  async getCurrent(city = 'Delhi') {
    try {
      const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Weather not found');
      const data = await response.json();
      return {
        success: true,
        weather: {
          location: data.name,
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: WeatherAPI.mapIcon(data.weather[0].icon)
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Map OpenWeatherMap icon code to FontAwesome icon class
  mapIcon(iconCode) {
    const map = {
      '01d': 'fas fa-sun',
      '01n': 'fas fa-moon',
      '02d': 'fas fa-cloud-sun',
      '02n': 'fas fa-cloud-moon',
      '03d': 'fas fa-cloud',
      '03n': 'fas fa-cloud',
      '04d': 'fas fa-cloud-meatball',
      '04n': 'fas fa-cloud-meatball',
      '09d': 'fas fa-cloud-showers-heavy',
      '09n': 'fas fa-cloud-showers-heavy',
      '10d': 'fas fa-cloud-sun-rain',
      '10n': 'fas fa-cloud-moon-rain',
      '11d': 'fas fa-bolt',
      '11n': 'fas fa-bolt',
      '13d': 'fas fa-snowflake',
      '13n': 'fas fa-snowflake',
      '50d': 'fas fa-smog',
      '50n': 'fas fa-smog',
    };
    return map[iconCode] || 'fas fa-sun';
  }
};

// Make WeatherAPI globally available
window.WeatherAPI = WeatherAPI;
