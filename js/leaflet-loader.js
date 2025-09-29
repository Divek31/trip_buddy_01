// Geoapify + Leaflet loader for TripBuddy
// This script loads Leaflet and Geoapify map tiles for use in React components

// Load Leaflet CSS
const leafletCss = document.createElement('link');
leafletCss.rel = 'stylesheet';
leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
document.head.appendChild(leafletCss);

// Load Leaflet JS
const leafletScript = document.createElement('script');
leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
leafletScript.async = true;
document.head.appendChild(leafletScript);

// Wait for Leaflet to load
leafletScript.onload = () => {
  window.L = window.L || window.leaflet;
  console.log('Leaflet loaded for Geoapify maps');
};
