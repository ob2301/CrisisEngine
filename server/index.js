const express = require('express');
const cors = require('cors');
const CrisisAIAgent = require('./aiAgent');
const app = express();
const PORT = process.env.PORT || 5001;

// Initialize AI Agent
const aiAgent = new CrisisAIAgent();

app.use(cors());
app.use(express.json());

// City data with coordinates and emergency resources
const cities = {
  'miami': {
    name: 'Miami, FL',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    population: 442000,
    policeStations: [
      { id: 1, name: 'Downtown Precinct', lat: 25.7743, lng: -80.1937, officers: 45 },
      { id: 2, name: 'South Beach Station', lat: 25.7907, lng: -80.1300, officers: 32 },
      { id: 3, name: 'North Miami Station', lat: 25.8901, lng: -80.1865, officers: 28 },
      { id: 4, name: 'Airport Station', lat: 25.7959, lng: -80.2870, officers: 20 }
    ],
    fireStations: [
      { id: 1, name: 'Fire Station 1', lat: 25.7617, lng: -80.1918, units: 8 },
      { id: 2, name: 'Fire Station 2', lat: 25.7907, lng: -80.1300, units: 6 },
      { id: 3, name: 'Fire Station 3', lat: 25.8901, lng: -80.1865, units: 5 }
    ],
    hospitals: [
      { id: 1, name: 'Jackson Memorial', lat: 25.7907, lng: -80.2100, beds: 1500 },
      { id: 2, name: 'Mount Sinai', lat: 25.7907, lng: -80.1300, beds: 700 }
    ],
    vulnerability: {
      floodRisk: 0.85,
      hurricaneRisk: 0.90,
      seaLevel: 1.2
    }
  },
  'new-york': {
    name: 'New York, NY',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    population: 8336817,
    policeStations: [
      { id: 1, name: 'NYPD 1st Precinct', lat: 40.7128, lng: -74.0060, officers: 120 },
      { id: 2, name: 'NYPD Midtown', lat: 40.7549, lng: -73.9840, officers: 95 },
      { id: 3, name: 'NYPD Brooklyn', lat: 40.6782, lng: -73.9442, officers: 88 },
      { id: 4, name: 'NYPD Queens', lat: 40.7282, lng: -73.7949, officers: 75 }
    ],
    fireStations: [
      { id: 1, name: 'FDNY Engine 1', lat: 40.7128, lng: -74.0060, units: 12 },
      { id: 2, name: 'FDNY Engine 2', lat: 40.7549, lng: -73.9840, units: 10 },
      { id: 3, name: 'FDNY Engine 3', lat: 40.6782, lng: -73.9442, units: 9 }
    ],
    hospitals: [
      { id: 1, name: 'NYU Langone', lat: 40.7411, lng: -73.9897, beds: 800 },
      { id: 2, name: 'Mount Sinai', lat: 40.7870, lng: -73.9554, beds: 1200 }
    ],
    vulnerability: {
      floodRisk: 0.75,
      hurricaneRisk: 0.60,
      seaLevel: 0.5
    }
  },
  'los-angeles': {
    name: 'Los Angeles, CA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    population: 3967000,
    policeStations: [
      { id: 1, name: 'LAPD Central', lat: 34.0522, lng: -118.2437, officers: 85 },
      { id: 2, name: 'LAPD West LA', lat: 34.0522, lng: -118.4451, officers: 72 },
      { id: 3, name: 'LAPD Hollywood', lat: 34.0928, lng: -118.3287, officers: 65 },
      { id: 4, name: 'LAPD Harbor', lat: 33.7701, lng: -118.1937, officers: 58 }
    ],
    fireStations: [
      { id: 1, name: 'LAFD Station 1', lat: 34.0522, lng: -118.2437, units: 10 },
      { id: 2, name: 'LAFD Station 2', lat: 34.0928, lng: -118.3287, units: 8 },
      { id: 3, name: 'LAFD Station 3', lat: 33.7701, lng: -118.1937, units: 7 }
    ],
    hospitals: [
      { id: 1, name: 'Cedars-Sinai', lat: 34.0754, lng: -118.3840, beds: 958 },
      { id: 2, name: 'UCLA Medical', lat: 34.0689, lng: -118.4452, beds: 520 }
    ],
    vulnerability: {
      floodRisk: 0.40,
      hurricaneRisk: 0.10,
      earthquakeRisk: 0.85,
      wildfireRisk: 0.70
    }
  },
  'seattle': {
    name: 'Seattle, WA',
    coordinates: { lat: 47.6062, lng: -122.3321 },
    population: 749000,
    policeStations: [
      { id: 1, name: 'SPD West Precinct', lat: 47.6062, lng: -122.3321, officers: 55 },
      { id: 2, name: 'SPD East Precinct', lat: 47.6062, lng: -122.3000, officers: 48 },
      { id: 3, name: 'SPD North Precinct', lat: 47.6800, lng: -122.3321, officers: 42 }
    ],
    fireStations: [
      { id: 1, name: 'SFD Station 1', lat: 47.6062, lng: -122.3321, units: 7 },
      { id: 2, name: 'SFD Station 2', lat: 47.6800, lng: -122.3321, units: 6 }
    ],
    hospitals: [
      { id: 1, name: 'Harborview Medical', lat: 47.6062, lng: -122.3100, beds: 413 },
      { id: 2, name: 'Swedish Medical', lat: 47.6100, lng: -122.3321, beds: 697 }
    ],
    vulnerability: {
      floodRisk: 0.50,
      earthquakeRisk: 0.80,
      tsunamiRisk: 0.65
    }
  },
  'boston': {
    name: 'Boston, MA',
    coordinates: { lat: 42.3601, lng: -71.0589 },
    population: 692600,
    policeStations: [
      { id: 1, name: 'BPD District A-1', lat: 42.3601, lng: -71.0589, officers: 68 },
      { id: 2, name: 'BPD District B-2', lat: 42.3601, lng: -71.1000, officers: 62 },
      { id: 3, name: 'BPD District C-6', lat: 42.3200, lng: -71.0589, officers: 55 }
    ],
    fireStations: [
      { id: 1, name: 'BFD Engine 1', lat: 42.3601, lng: -71.0589, units: 8 },
      { id: 2, name: 'BFD Engine 2', lat: 42.3200, lng: -71.0589, units: 7 }
    ],
    hospitals: [
      { id: 1, name: 'Mass General', lat: 42.3630, lng: -71.0682, beds: 999 },
      { id: 2, name: 'Brigham and Women\'s', lat: 42.3359, lng: -71.1075, beds: 793 }
    ],
    vulnerability: {
      floodRisk: 0.70,
      hurricaneRisk: 0.55,
      blizzardRisk: 0.60,
      seaLevel: 0.3
    }
  }
};

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate response time based on distance and traffic
function calculateResponseTime(distance, baseSpeed = 50, trafficMultiplier = 1.0) {
  // Base speed in km/h, convert to minutes
  const timeInHours = distance / (baseSpeed * trafficMultiplier);
  return Math.max(5, Math.round(timeInHours * 60)); // Minimum 5 minutes
}

// Simulate disaster impact
function simulateDisaster(cityKey, disasterType, severity, affectedArea) {
  const city = cities[cityKey];
  if (!city) return null;

  const simulation = {
    city: city.name,
    disasterType,
    severity,
    timestamp: new Date().toISOString(),
    affectedArea: {
      center: affectedArea.center,
      radius: affectedArea.radius // in km
    },
    emergencyResponse: {
      police: [],
      fire: [],
      medical: []
    },
    vulnerability: {
      score: 0,
      factors: []
    },
    timeline: []
  };

  // Calculate which resources are in range
  const affectedResources = {
    police: [],
    fire: [],
    hospitals: []
  };

  // Check police stations
  city.policeStations.forEach(station => {
    const distance = calculateDistance(
      affectedArea.center.lat,
      affectedArea.center.lng,
      station.lat,
      station.lng
    );
    
    if (distance <= affectedArea.radius + 5) { // 5km buffer for response
      const responseTime = calculateResponseTime(distance, 60, 1.0);
      affectedResources.police.push({
        ...station,
        distance: Math.round(distance * 10) / 10,
        responseTime,
        available: station.officers > 0
      });
    }
  });

  // Check fire stations
  city.fireStations.forEach(station => {
    const distance = calculateDistance(
      affectedArea.center.lat,
      affectedArea.center.lng,
      station.lat,
      station.lng
    );
    
    if (distance <= affectedArea.radius + 5) {
      const responseTime = calculateResponseTime(distance, 70, 1.0);
      affectedResources.fire.push({
        ...station,
        distance: Math.round(distance * 10) / 10,
        responseTime,
        available: station.units > 0
      });
    }
  });

  // Check hospitals
  city.hospitals.forEach(hospital => {
    const distance = calculateDistance(
      affectedArea.center.lat,
      affectedArea.center.lng,
      hospital.lat,
      hospital.lng
    );
    
    if (distance <= affectedArea.radius + 10) { // Larger buffer for hospitals
      const responseTime = calculateResponseTime(distance, 50, 1.2);
      affectedResources.hospitals.push({
        ...hospital,
        distance: Math.round(distance * 10) / 10,
        responseTime,
        capacity: hospital.beds
      });
    }
  });

  simulation.emergencyResponse = affectedResources;

  // Calculate vulnerability score
  let vulnerabilityScore = 0;
  const factors = [];

  // Factor 1: Response time (longer = more vulnerable)
  const avgPoliceResponse = affectedResources.police.length > 0
    ? affectedResources.police.reduce((sum, r) => sum + r.responseTime, 0) / affectedResources.police.length
    : 999;
  const avgFireResponse = affectedResources.fire.length > 0
    ? affectedResources.fire.reduce((sum, r) => sum + r.responseTime, 0) / affectedResources.fire.length
    : 999;

  if (avgPoliceResponse > 30) {
    vulnerabilityScore += 30;
    factors.push({ type: 'slow_police_response', value: avgPoliceResponse, impact: 'High' });
  } else if (avgPoliceResponse > 15) {
    vulnerabilityScore += 15;
    factors.push({ type: 'moderate_police_response', value: avgPoliceResponse, impact: 'Medium' });
  }

  if (avgFireResponse > 30) {
    vulnerabilityScore += 30;
    factors.push({ type: 'slow_fire_response', value: avgFireResponse, impact: 'High' });
  } else if (avgFireResponse > 15) {
    vulnerabilityScore += 15;
    factors.push({ type: 'moderate_fire_response', value: avgFireResponse, impact: 'Medium' });
  }

  // Factor 2: Resource availability
  if (affectedResources.police.length === 0) {
    vulnerabilityScore += 25;
    factors.push({ type: 'no_police_coverage', impact: 'Critical' });
  }
  if (affectedResources.fire.length === 0) {
    vulnerabilityScore += 25;
    factors.push({ type: 'no_fire_coverage', impact: 'Critical' });
  }

  // Factor 3: City-specific vulnerability
  if (city.vulnerability.floodRisk && disasterType === 'flood') {
    vulnerabilityScore += city.vulnerability.floodRisk * 20;
    factors.push({ type: 'high_flood_risk', value: city.vulnerability.floodRisk, impact: 'High' });
  }

  // Factor 4: Severity impact
  vulnerabilityScore += severity * 10;

  simulation.vulnerability = {
    score: Math.min(100, Math.round(vulnerabilityScore)),
    factors,
    level: vulnerabilityScore >= 70 ? 'Critical' : vulnerabilityScore >= 50 ? 'High' : vulnerabilityScore >= 30 ? 'Medium' : 'Low'
  };

  // Generate timeline
  const timeline = [];
  timeline.push({ time: 0, event: 'Disaster detected', status: 'alert' });
  
  if (affectedResources.police.length > 0) {
    const fastestPolice = affectedResources.police.sort((a, b) => a.responseTime - b.responseTime)[0];
    timeline.push({ 
      time: fastestPolice.responseTime, 
      event: `Police units arrive from ${fastestPolice.name}`, 
      status: 'response' 
    });
  }
  
  if (affectedResources.fire.length > 0) {
    const fastestFire = affectedResources.fire.sort((a, b) => a.responseTime - b.responseTime)[0];
    timeline.push({ 
      time: fastestFire.responseTime, 
      event: `Fire units arrive from ${fastestFire.name}`, 
      status: 'response' 
    });
  }

  timeline.push({ 
    time: Math.max(...timeline.map(t => t.time)) + 30, 
    event: 'Initial assessment complete', 
    status: 'assessment' 
  });

  simulation.timeline = timeline.sort((a, b) => a.time - b.time);

  return simulation;
}

// Routes
app.get('/api/cities', (req, res) => {
  const cityList = Object.keys(cities).map(key => ({
    key,
    name: cities[key].name,
    coordinates: cities[key].coordinates,
    population: cities[key].population,
    vulnerability: cities[key].vulnerability
  }));
  res.json(cityList);
});

app.get('/api/cities/:cityKey', (req, res) => {
  const { cityKey } = req.params;
  if (cities[cityKey]) {
    res.json(cities[cityKey]);
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

app.post('/api/simulate', (req, res) => {
  const { cityKey, disasterType, severity, affectedArea } = req.body;
  
  if (!cityKey || !disasterType || !affectedArea) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const simulation = simulateDisaster(cityKey, disasterType, severity || 5, affectedArea);
  
  if (simulation) {
    // Get AI agent analysis
    const cityData = cities[cityKey];
    const aiAnalysis = aiAgent.analyzeSimulation(simulation, cityData);
    simulation.aiAnalysis = aiAnalysis;
    
    res.json(simulation);
  } else {
    res.status(400).json({ error: 'Invalid simulation parameters' });
  }
});

// AI Agent endpoints
app.post('/api/ai/analyze', (req, res) => {
  const { simulation, cityKey } = req.body;
  
  if (!simulation || !cityKey) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const cityData = cities[cityKey];
  const analysis = aiAgent.analyzeSimulation(simulation, cityData);
  
  res.json(analysis);
});

app.post('/api/ai/predict', (req, res) => {
  const { cityKey, disasterType, baseSimulation } = req.body;
  
  if (!cityKey || !disasterType || !baseSimulation) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const scenarios = aiAgent.predictScenarios(cityKey, disasterType, baseSimulation);
  
  res.json({ scenarios });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

