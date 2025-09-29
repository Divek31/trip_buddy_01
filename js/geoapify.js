// Geoapify Places API integration for TripBuddy
// Usage: GeoapifyAPI.getPlaces(lat, lon, type)

const GeoapifyAPI = {
  apiKey: 'a04fcfaa3d96469f9a868afb5c0d2bb1',
  baseUrl: 'https://api.geoapify.com/v2/places',

  // type: 'restaurant', 'fuel', etc.
  async getPlaces(lat, lon, type) {
    try {
      const url = `${this.baseUrl}?categories=${type}&filter=circle:${lon},${lat},5000&limit=10&apiKey=${this.apiKey}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Places not found');
      const data = await response.json();
      return {
        success: true,
        places: data.features.map(f => ({
          name: f.properties.name || f.properties.address_line1,
          address: f.properties.address_line2 || '',
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Make GeoapifyAPI globally available
window.GeoapifyAPI = GeoapifyAPI;
