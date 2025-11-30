import React from 'react';
import './SimulationResults.css';
import ResponseChart from './ResponseChart';

const SimulationResults = ({ simulation }) => {
  if (!simulation) return null;

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="card">
      <h2>📊 Simulation Results</h2>
      
      <div className="simulation-header">
        <div className="simulation-info">
          <span className="disaster-badge">{simulation.disasterType.toUpperCase()}</span>
          <span className="city-name">{simulation.city}</span>
          <span className="severity-badge">Severity: {simulation.severity}/10</span>
        </div>
        <div className="timestamp">
          {new Date(simulation.timestamp).toLocaleString()}
        </div>
      </div>

      <div className="response-grid">
        <div className="response-section">
          <h3>🚔 Police Response</h3>
          {simulation.emergencyResponse.police.length > 0 ? (
            <>
              <ResponseChart 
                data={simulation.emergencyResponse.police.sort((a, b) => a.responseTime - b.responseTime)} 
                title="Response Time Comparison"
                color="#2196F3"
              />
              <div className="response-list">
                {simulation.emergencyResponse.police
                  .sort((a, b) => a.responseTime - b.responseTime)
                  .map((station, idx) => (
                    <div key={station.id} className="response-item">
                      <div className="response-header">
                        <span className="response-rank">#{idx + 1}</span>
                        <span className="response-name">{station.name}</span>
                      </div>
                      <div className="response-details">
                        <span>⏱️ {station.responseTime} min</span>
                        <span>📏 {station.distance} km</span>
                        <span>👮 {station.officers} officers</span>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="no-response">⚠️ No police coverage in affected area</div>
          )}
        </div>

        <div className="response-section">
          <h3>🚒 Fire Response</h3>
          {simulation.emergencyResponse.fire.length > 0 ? (
            <>
              <ResponseChart 
                data={simulation.emergencyResponse.fire.sort((a, b) => a.responseTime - b.responseTime)} 
                title="Response Time Comparison"
                color="#F44336"
              />
              <div className="response-list">
                {simulation.emergencyResponse.fire
                  .sort((a, b) => a.responseTime - b.responseTime)
                  .map((station, idx) => (
                    <div key={station.id} className="response-item">
                      <div className="response-header">
                        <span className="response-rank">#{idx + 1}</span>
                        <span className="response-name">{station.name}</span>
                      </div>
                      <div className="response-details">
                        <span>⏱️ {station.responseTime} min</span>
                        <span>📏 {station.distance} km</span>
                        <span>🚒 {station.units} units</span>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="no-response">⚠️ No fire coverage in affected area</div>
          )}
        </div>

        <div className="response-section">
          <h3>🏥 Medical Response</h3>
          {simulation.emergencyResponse.hospitals.length > 0 ? (
            <>
              <ResponseChart 
                data={simulation.emergencyResponse.hospitals.sort((a, b) => a.responseTime - b.responseTime)} 
                title="Response Time Comparison"
                color="#4CAF50"
              />
              <div className="response-list">
                {simulation.emergencyResponse.hospitals
                  .sort((a, b) => a.responseTime - b.responseTime)
                  .map((hospital, idx) => (
                    <div key={hospital.id} className="response-item">
                      <div className="response-header">
                        <span className="response-rank">#{idx + 1}</span>
                        <span className="response-name">{hospital.name}</span>
                      </div>
                      <div className="response-details">
                        <span>⏱️ {hospital.responseTime} min</span>
                        <span>📏 {hospital.distance} km</span>
                        <span>🛏️ {hospital.capacity} beds</span>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="no-response">⚠️ No hospital coverage in affected area</div>
          )}
        </div>
      </div>

      {simulation.timeline && simulation.timeline.length > 0 && (
        <div className="timeline-section">
          <h3>⏰ Response Timeline</h3>
          <div className="timeline">
            {simulation.timeline.map((event, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-time">{formatTime(event.time)}</div>
                <div className="timeline-event">
                  <span className={`timeline-status ${event.status}`}>{event.status}</span>
                  <span className="timeline-description">{event.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationResults;

