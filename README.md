# ☀️ Weather App

A simple and responsive weather forecast app built with **React**, **Tailwind CSS**, and the **OpenWeatherMap API**. It allows users to search any city worldwide and get real-time weather data with icons, themed backgrounds, and recent searches.

---

## 🚀 Features

- 🔍 Search weather by city (worldwide support)
- 🎨 Dynamic background based on weather condition
- 🌤 Weather icons via OpenWeather
- ✨ Auto-suggestions while typing
- 🕘 Recent search history
- 📱 Fully mobile responsive

---

## 🧰 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **API:** OpenWeatherMap API

---

## 📦 Installation

bash
git clone https://github.com/keerthana-lang/weather-app.git
cd weather-app
npm install
npm run dev

🔑 API Info
This app uses the OpenWeatherMap API.
To use it:

Sign up on OpenWeather

Generate an API key

Replace the placeholder API key in App.jsx:

js
Copy code
const API_KEY = "2f9ae1e0d40276c5f482eb62345b465e";

src/
├── App.jsx
├── data/
│   └── cityList.js   // list of cities for suggestions
└── index.css
