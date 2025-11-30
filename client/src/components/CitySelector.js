import React from 'react';
import './CitySelector.css';

const CitySelector = ({ cities, selectedCity, onSelectCity }) => {
  if (!cities || cities.length === 0) {
    return (
      <div className="card">
        <h2>📍 Select City</h2>
        <div className="loading-message">No cities available</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📍 Select City</h2>
      <div className="city-grid">
        {cities.map(city => (
          <button
            key={city.key}
            className={`city-button ${selectedCity === city.key ? 'active' : ''}`}
            onClick={() => onSelectCity(city.key)}
          >
            <div className="city-name">{city.name || 'Unknown City'}</div>
            <div className="city-info">
              <span>👥 {city.population ? city.population.toLocaleString() : 'N/A'}</span>
              {city.vulnerability?.floodRisk && (
                <span className="risk-badge flood">🌊 {Math.round(city.vulnerability.floodRisk * 100)}%</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySelector;

