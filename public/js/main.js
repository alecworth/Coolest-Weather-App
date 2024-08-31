window.initAutocomplete = function() {
    const input = document.getElementById('search-bar');

    if (input && input instanceof HTMLInputElement) {
        const autocomplete = new google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: 'us' } // Restrict results to the USA
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) {
                console.error('No details available for input: "' + place.name + '"');
                return;
            }

            // Extract latitude and longitude from the Google Maps API response
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            // Use lat and lng in your weather API request
            getWeatherData(lat, lng);
        });
    } else {
        console.error('Search bar element is not an HTMLInputElement or not found');
    }
};


function getWeatherData(lat, lng) {
    // Redirect to a new URL with lat and lng as query parameters
    window.location.href = `/?lat=${lat}&lng=${lng}`;
}

// Ensure the Google Maps API is loaded before calling initAutocomplete
document.addEventListener('DOMContentLoaded', () => {
    if (typeof google !== 'undefined') {
        initAutocomplete();
    } else {
        console.error('Google Maps API not loaded');
    }
});
