# Cool Weather App

A weather application that provides current weather data and forecasts for any location using the Google Maps JS API. 

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alecworth/cool-weather-app.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd cool-weather-app
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up the environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following line to specify the port and any other necessary environment variables:
   ```env
   PORT=3000
   GOOGLE_MAPS_API_KEY (which you can find here: https://developers.google.com/maps/documentation/javascript/overview)
   ```


5. **Start the application:**
   ```bash
   npm start
   ```

## Usage

After running `npm start`, the application will be available at `http://localhost:3000` (or another port if specified in your `.env` file). Enter a location to get the current weather and forecast.
