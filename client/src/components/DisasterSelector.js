import React from 'react';
import './DisasterSelector.css';

const disasters = [
  { type: 'flood', name: 'Flood', icon: '🌊', color: '#2196F3' },
  { type: 'hurricane', name: 'Hurricane', icon: '🌀', color: '#FF9800' },
  { type: 'earthquake', name: 'Earthquake', icon: '🌍', color: '#F44336' },
  { type: 'wildfire', name: 'Wildfire', icon: '🔥', color: '#FF5722' },
  { type: 'tsunami', name: 'Tsunami', icon: '🌊', color: '#00BCD4' },
  { type: 'blizzard', name: 'Blizzard', icon: '❄️', color: '#03A9F4' }
];

const DisasterSelector = ({ disasterType, onSelectDisaster, severity, onSeverityChange }) => {
  return (
    <div className="card">
      <h2>⚠️ Disaster Type</h2>
      <div className="disaster-grid">
        {disasters.map(disaster => (
          <button
            key={disaster.type}
            className={`disaster-button ${disasterType === disaster.type ? 'active' : ''}`}
            onClick={() => onSelectDisaster(disaster.type)}
            style={{
              borderColor: disasterType === disaster.type ? disaster.color : '#e0e0e0',
              background: disasterType === disaster.type ? `${disaster.color}15` : 'white'
            }}
          >
            <span className="disaster-icon">{disaster.icon}</span>
            <span className="disaster-name">{disaster.name}</span>
          </button>
        ))}
      </div>

      {disasterType && (
        <div className="severity-selector">
          <h3>Severity Level</h3>
          <div className="severity-control">
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => onSeverityChange(parseInt(e.target.value))}
              className="severity-slider"
            />
            <div className="severity-value">
              <span className="severity-number">{severity}</span>
              <span className="severity-label">/ 10</span>
            </div>
          </div>
          <div className="severity-bars">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`severity-bar ${i < severity ? 'active' : ''}`}
                style={{
                  background: i < severity 
                    ? `linear-gradient(135deg, #f5576c 0%, #f093fb 100%)`
                    : '#e0e0e0'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterSelector;

