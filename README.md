# Weather Intelligence App

A responsive React + Vite web application that shows current weather, forecasts, and simple recommendations for any city the user searches. It uses the free Open-Meteo API.

## Features

- **City Search:** Search for any city to get its weather forecast.
- **Current Weather:** View current temperature, weather conditions, wind speed, and humidity.
- **5-Day Forecast:** See the expected high and low temperatures along with weather conditions for the next 5 days.
- **Charts:** Visualize the temperature trends with an interactive line chart.
- **Recommendations:** Get simple, context-aware recommendations based on the current weather (e.g., "Carry an umbrella").

## Prerequisites

- Node.js installed on your machine.

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

**Note:** No API key is required to run this application! The Open-Meteo API is free and open for non-commercial use.

## Deployment to Cloudflare Pages

This app is built as a Single Page Application (SPA) using React and Vite, and is designed to be easily deployable to Cloudflare Pages.

1. **Connect to GitHub from Google AI Studio:**
   - In Google AI Studio, use the export/share options to publish your project directly to a new GitHub repository.

2. **Deploy to Cloudflare Pages:**
   - Log in to your Cloudflare dashboard and navigate to "Workers & Pages" -> "Overview" -> "Create application" -> "Pages" -> "Connect to Git".
   - Select the GitHub repository you created in step 1.
   - Configure the build settings:
     - **Framework preset:** None (or Vite if available)
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
   - Click "Save and Deploy".

A `public/_redirects` file is included in this repository to ensure routing works correctly upon page refresh in Cloudflare Pages.
