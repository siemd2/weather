'use client';

import React, { useState } from 'react';

const API_KEY = 'f2b838b17ca400e42ed2fc5b7000b5b4';

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [favorites, setFavorites] = useState([]);

    async function fetchWeather(city = search) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            if (data.cod === 200) {
                setWeather(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSearch = (e) => setSearch(e.target.value);

    const handleClick = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    const handleAddFavorite = (e) => {
        e.preventDefault(); // Prevent form submission
        if (search && !favorites.includes(search)) {
            setFavorites([...favorites, search]);
        }
    };

    const handleFavoriteClick = (city) => {
        fetchWeather(city);
    };

    return (
        <div className="min-h-screen flex items-start justify-start bg-fixed bg-cover p-10 space-x-5" style={{ backgroundImage: `url('https://source.unsplash.com/random/1920x1080?weather')` }}>
            <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 opacity-90 p-10 rounded-xl">
                <h1 className="text-5xl font-bold text-white mb-8">Weather Finder</h1>
                <form className="flex flex-col mb-6">
                    <input 
                        type="text" 
                        placeholder="Enter City" 
                        className="mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black" 
                        value={search} 
                        onChange={handleSearch}
                    />
                    <div className="flex space-x-2">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300" 
                            onClick={handleClick}
                        >
                            Search
                        </button>
                        <button 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300" 
                            onClick={handleAddFavorite}
                        >
                            Add to Favorites
                        </button>
                    </div>
                </form>
                {weather.main && (
                    <div className="bg-blue-900 bg-opacity-80 p-5 rounded-xl shadow-lg">
                        <h2 className="text-3xl font-bold mb-2">{weather.name}</h2>
                        <p className="text-xl mb-1">Temperature: {Math.round(weather.main.temp)}°C</p>
                        <p className="text-xl mb-1">Condition: {weather.weather[0].main}</p>
                        <p className="text-xl mb-1">Humidity: {weather.main.humidity}%</p>
                        <p className="text-xl">Wind Speed: {weather.wind.speed} m/s</p>
                    </div>
                )}
            </div>

            <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 opacity-90 p-10 rounded-xl">
                <h2 className="text-4xl font-bold text-white mb-8">Favorites</h2>
                <div className="space-y-2">
                    {favorites.map((city, index) => (
                        <div 
                            key={index}
                            className="bg-blue-900 bg-opacity-80 p-3 rounded-lg cursor-pointer"
                            onClick={() => handleFavoriteClick(city)}
                        >
                            {city}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
