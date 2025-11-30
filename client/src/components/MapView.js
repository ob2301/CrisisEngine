import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Fix for default markers in React-Leaflet
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

// Component to update map center when city changes
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Component to handle map clicks
function MapClickHandler({ onAreaChange, affectedArea }) {
  useMapEvents({
    click: (e) => {
      if (onAreaChange) {
        onAreaChange(
          { lat: e.latlng.lat, lng: e.latlng.lng },
          affectedArea?.radius || 5
        );
      }
    },
  });
  return null;
}

const MapView = ({ cityData, affectedArea, onAreaChange, simulation }) => {
  // Helper function to safely encode SVG to base64
  const encodeSVG = (svgString) => {
    try {
      if (typeof btoa !== 'undefined') {
        return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
      }
      // Fallback: use encodeURIComponent
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    } catch (e) {
      console.error('Error encoding SVG:', e);
      return '';
    }
  };

  const getVulnerabilityColor = (score) => {
    if (!score) return '#FF9800';
    if (score >= 70) return '#F44336'; // Red - Critical
    if (score >= 50) return '#FF9800'; // Orange - High
    if (score >= 30) return '#FFC107'; // Yellow - Medium
    return '#4CAF50'; // Green - Low
  };

  const createMarkerIcon = (color) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" viewBox="0 0 25 35">
        <path fill="${color}" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.75 12.5 22.5 12.5 22.5S25 21.25 25 12.5C25 5.6 19.4 0 12.5 0zm0 17c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
      </svg>
    `;
    return L.icon({
      iconUrl: encodeSVG(svg),
      iconSize: [25, 35],
      iconAnchor: [12, 35],
      popupAnchor: [0, -35]
    });
  };

  if (!cityData || !cityData.coordinates) {
    return (
      <div className="card map-container">
        <h2>🗺️ City Map & Emergency Resources</h2>
        <div className="loading-message">Loading city data...</div>
      </div>
    );
  }

  return (
    <div className="card map-container">
      <h2>🗺️ City Map & Emergency Resources</h2>
      <div className="map-instructions">
        <p>Click on the map to set the disaster location. Use the slider to adjust affected radius.</p>
        {affectedArea && (
          <div className="radius-control">
            <label>Affected Radius: {affectedArea.radius} km</label>
            <input
              type="range"
              min="1"
              max="20"
              value={affectedArea.radius}
              onChange={(e) => onAreaChange(affectedArea.center, parseInt(e.target.value))}
              className="radius-slider"
            />
          </div>
        )}
      </div>
      
      <MapContainer
        center={[cityData.coordinates.lat, cityData.coordinates.lng]}
        zoom={12}
        style={{ height: '500px', width: '100%', borderRadius: '10px' }}
      >
        <MapUpdater center={[cityData.coordinates.lat, cityData.coordinates.lng]} zoom={12} />
        <MapClickHandler onAreaChange={onAreaChange} affectedArea={affectedArea} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Police Stations */}
        {cityData.policeStations && cityData.policeStations.map(station => {
          const inSimulation = simulation?.emergencyResponse?.police?.find(
            p => p.id === station.id
          );
          return (
            <Marker
              key={`police-${station.id}`}
              position={[station.lat, station.lng]}
              icon={createMarkerIcon(inSimulation ? '#2196F3' : '#9E9E9E')}
            >
              <Popup>
                <div className="popup-content">
                  <strong>🚔 {station.name}</strong>
                  <p>Officers: {station.officers}</p>
                  {inSimulation && (
                    <>
                      <p>Distance: {inSimulation.distance} km</p>
                      <p>Response Time: {inSimulation.responseTime} min</p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Fire Stations */}
        {cityData.fireStations && cityData.fireStations.map(station => {
          const inSimulation = simulation?.emergencyResponse?.fire?.find(
            f => f.id === station.id
          );
          return (
            <Marker
              key={`fire-${station.id}`}
              position={[station.lat, station.lng]}
              icon={createMarkerIcon(inSimulation ? '#F44336' : '#9E9E9E')}
            >
              <Popup>
                <div className="popup-content">
                  <strong>🚒 {station.name}</strong>
                  <p>Units: {station.units}</p>
                  {inSimulation && (
                    <>
                      <p>Distance: {inSimulation.distance} km</p>
                      <p>Response Time: {inSimulation.responseTime} min</p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Hospitals */}
        {cityData.hospitals && cityData.hospitals.map(hospital => {
          const inSimulation = simulation?.emergencyResponse?.hospitals?.find(
            h => h.id === hospital.id
          );
          return (
            <Marker
              key={`hospital-${hospital.id}`}
              position={[hospital.lat, hospital.lng]}
              icon={createMarkerIcon(inSimulation ? '#4CAF50' : '#9E9E9E')}
            >
              <Popup>
                <div className="popup-content">
                  <strong>🏥 {hospital.name}</strong>
                  <p>Beds: {hospital.beds}</p>
                  {inSimulation && (
                    <>
                      <p>Distance: {inSimulation.distance} km</p>
                      <p>Response Time: {inSimulation.responseTime} min</p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Affected Area Circle */}
        {affectedArea && affectedArea.center && (
          <Circle
            center={[affectedArea.center.lat, affectedArea.center.lng]}
            radius={(affectedArea.radius || 5) * 1000} // Convert km to meters
            pathOptions={{
              color: simulation?.vulnerability ? getVulnerabilityColor(simulation.vulnerability.score) : '#FF9800',
              fillColor: simulation?.vulnerability ? getVulnerabilityColor(simulation.vulnerability.score) : '#FF9800',
              fillOpacity: 0.3,
              weight: 2
            }}
          >
            <Popup>
              <div className="popup-content">
                <strong>Disaster Zone</strong>
                <p>Radius: {affectedArea.radius || 5} km</p>
                {simulation?.vulnerability && (
                  <p>Vulnerability: {simulation.vulnerability.score}/100</p>
                )}
              </div>
            </Popup>
          </Circle>
        )}

        {/* Disaster Location Marker */}
        {affectedArea && affectedArea.center && (
          <Marker
            position={[affectedArea.center.lat, affectedArea.center.lng]}
            icon={L.icon({
              iconUrl: encodeSVG(`
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                  <circle cx="15" cy="15" r="12" fill="#F44336" stroke="white" stroke-width="2"/>
                  <text x="15" y="20" font-size="18" text-anchor="middle" fill="white">⚠️</text>
                </svg>
              `),
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })}
          >
            <Popup>
              <div className="popup-content">
                <strong>Disaster Location</strong>
                <p>Click map to move</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;

