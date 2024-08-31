require('dotenv').config(); // Ensure environment variables are loaded
const axios = require('axios');

module.exports = {
    getWeather: async (req, res) => {
        try {
            // Default forecast URL for initial page load
            const defaultForecastUrl = 'https://api.weather.gov/gridpoints/STO/39,122/forecast';
            let forecastUrl = defaultForecastUrl;

            // Check if latitude and longitude are provided
            if (req.query.lat && req.query.lng) {
                const lat = parseFloat(req.query.lat).toFixed(4);
                const lng = parseFloat(req.query.lng).toFixed(4);
                const pointsUrl = `https://api.weather.gov/points/${lat},${lng}/`;

                // Fetch the forecast URL from the points URL
                const response = await axios.get(pointsUrl);
                forecastUrl = response.data.properties.forecast;
            } else if (req.query.forecastUrl) {
                // If a new forecast URL is provided directly, use it
                forecastUrl = req.query.forecastUrl;
            }

            console.log("Forecast URL:", forecastUrl); // Debugging line

            // Validate the forecast URL
            if (!forecastUrl || typeof forecastUrl !== 'string') {
                throw new Error('Invalid forecast URL.');
            }

            // Fetch the actual weather data using the forecast URL
            const forecastResponse = await axios.get(forecastUrl);
            const forecast = forecastResponse.data.properties.periods;

            console.log(forecast);

            // Check if forecast data is available
            if (!forecast || forecast.length === 0) {
                res.status(404).send('No weather data available.');
                return;
            }

            // Respond with JSON data or render EJS template
            if (req.xhr || req.headers.accept.includes('json')) {
                res.json(forecast);
            } else {
                res.render('weather', {
                    weather: forecast,
                    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY // Pass API key to the view
                });
            }
        } catch (err) {
            console.error(err);

            // Handle specific error responses
            if (err.response && err.response.status === 404) {
                res.status(404).send('Weather data not found. Please check the location.');
            } else {
                res.status(500).send('An error occurred while fetching weather data.');
            }
        }
    }
};
