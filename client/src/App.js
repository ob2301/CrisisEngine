import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CitySelector from './components/CitySelector';
import DisasterSelector from './components/DisasterSelector';
import MapView from './components/MapView';
import SimulationResults from './components/SimulationResults';
import VulnerabilityReport from './components/VulnerabilityReport';
import StatsDashboard from './components/StatsDashboard';
import ExportReport from './components/ExportReport';
import AIAnalysis from './components/AIAnalysis';

const API_BASE_URL = 'http://localhost:5001/api';

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [disasterType, setDisasterType] = useState(null);
  const [severity, setSeverity] = useState(5);
  const [affectedArea, setAffectedArea] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchCityData(selectedCity);
    }
  }, [selectedCity]);

  const fetchCities = async () => {
    setLoadingCities(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/cities`);
      setCities(response.data);
      if (response.data.length === 0) {
        setError('No cities available. Please check if the server is running.');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError(`Failed to connect to server. Make sure the backend is running on ${API_BASE_URL}`);
    } finally {
      setLoadingCities(false);
    }
  };

  const fetchCityData = async (cityKey) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cities/${cityKey}`);
      setCityData(response.data);
      setAffectedArea({
        center: response.data.coordinates,
        radius: 5
      });
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const handleSimulate = async () => {
    if (!selectedCity || !disasterType || !affectedArea) {
      alert('Please select a city and disaster type, and set the affected area on the map');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/simulate`, {
        cityKey: selectedCity,
        disasterType,
        severity,
        affectedArea
      });
      setSimulation(response.data);
    } catch (error) {
      console.error('Error running simulation:', error);
      alert('Error running simulation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAreaChange = (center, radius) => {
    setAffectedArea({ center, radius });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌊 Crisis Simulator</h1>
        <p>Real-time Disaster Response & Vulnerability Analysis</p>
      </header>

      <div className="App-container">
        <div className="App-controls">
          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
              <button onClick={fetchCities} className="retry-button">Retry</button>
            </div>
          )}
          {loadingCities ? (
            <div className="card">
              <h2>📍 Select City</h2>
              <div className="loading-message">Loading cities...</div>
            </div>
          ) : (
            <CitySelector
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
            />
          )}

          {cityData && (
            <>
              <DisasterSelector
                disasterType={disasterType}
                onSelectDisaster={setDisasterType}
                severity={severity}
                onSeverityChange={setSeverity}
              />

              <div className="simulate-button-container">
                <button
                  className="simulate-button"
                  onClick={handleSimulate}
                  disabled={loading || !disasterType}
                >
                  {loading ? 'Simulating...' : '🚨 Run Simulation'}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="App-content">
          {cityData && (
            <MapView
              cityData={cityData}
              affectedArea={affectedArea}
              onAreaChange={handleAreaChange}
              simulation={simulation}
            />
          )}

          {simulation && (
            <div className="results-container">
              <StatsDashboard simulation={simulation} />
              <AIAnalysis aiAnalysis={simulation.aiAnalysis} simulation={simulation} />
              <SimulationResults simulation={simulation} />
              <VulnerabilityReport vulnerability={simulation.vulnerability} />
              <ExportReport simulation={simulation} cityData={cityData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

