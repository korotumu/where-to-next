// src/App.js
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import CityList from './components/CityList';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const response = await fetch('http://localhost:5000/api/cities');
    const data = await response.json();
    setCities(data);
    setFilteredCities(data);
  };

  const handleFilter = (filters) => {
    // Implement filtering logic here
  };

  return (
    <div className="App">
      <Filter onFilter={handleFilter} />
      <div className="main-content">
        <Map cities={filteredCities} />
        <CityList cities={filteredCities} />
      </div>
    </div>
  );
}

export default App;

// src/components/Map.js
import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

function Map({ cities }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 0,
    longitude: 0,
    zoom: 2
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={YOUR_MAPBOX_ACCESS_TOKEN}
    >
      {cities.map(city => (
        <Marker key={city._id} latitude={city.latitude} longitude={city.longitude}>
          <div className="marker"></div>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default Map;

// src/components/CityList.js
import React from 'react';

function CityList({ cities }) {
  return (
    <div className="city-list">
      {cities.map(city => (
        <div key={city._id} className="city-card">
          <h2>{city.name}, {city.country}</h2>
          <p>Climate: {city.climate}</p>
          <p>Cost of Living: ${city.costOfLiving}</p>
          <p>Languages: {city.languages.join(', ')}</p>
          <p>Safety: {city.safety}/10</p>
          <p>Altitude: {city.altitude}m</p>
          <p>Population: {city.population.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default CityList;

// src/components/Filter.js
import React, { useState } from 'react';

function Filter({ onFilter }) {
  const [filters, setFilters] = useState({
    climate: '',
    costOfLiving: '',
    language: '',
    safety: '',
    altitude: '',
    population: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add input fields for each filter */}
      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default Filter;
