# Crisis Simulator

A comprehensive crisis simulation system for natural disaster response planning and vulnerability analysis. This application simulates real-world disaster scenarios across coastal US cities, calculating emergency response times and identifying areas at risk.

## Features

- **Multi-City Support**: Simulate disasters across 5 major coastal US cities
  - Miami, FL
  - New York, NY
  - Los Angeles, CA
  - Seattle, WA
  - Boston, MA

- **Disaster Types**: Support for multiple disaster scenarios
  - Floods
  - Hurricanes
  - Earthquakes
  - Wildfires
  - Tsunamis
  - Blizzards

- **Real-Time Simulation**: 
  - Calculate emergency response times based on distance and resource availability
  - Visualize police stations, fire stations, and hospitals on interactive maps
  - Track response timeline from disaster detection to assessment

- **Vulnerability Analysis**:
  - Comprehensive vulnerability scoring (0-100)
  - Risk factor identification
  - Response time analysis
  - Resource coverage assessment
  - Actionable recommendations

- **Interactive Visualizations**:
  - Interactive map with Leaflet
  - Click-to-set disaster location
  - Adjustable affected area radius
  - Real-time resource tracking
  - Color-coded vulnerability indicators

## Technology Stack

### Backend
- Node.js
- Express.js
- RESTful API

### Frontend
- React 18
- React Leaflet (Interactive Maps)
- Axios (API Communication)
- Modern CSS with gradients and animations

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CrisisSimulator
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for the root, server, and client.

3. **Start the development servers**
   ```bash
   npm run dev
   ```
   This starts both the backend server (port 5000) and React frontend (port 3000).

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

1. **Select a City**: Choose from one of the 5 coastal US cities
2. **Choose Disaster Type**: Select the type of natural disaster to simulate
3. **Set Severity**: Adjust the severity level (1-10) using the slider
4. **Set Disaster Location**: Click on the map to set where the disaster occurs
5. **Adjust Affected Area**: Use the radius slider to set the affected area size
6. **Run Simulation**: Click "Run Simulation" to analyze the scenario
7. **Review Results**: 
   - View emergency response times for police, fire, and medical services
   - Analyze vulnerability scores and risk factors
   - Review recommendations for improving response

## API Endpoints

### GET `/api/cities`
Returns list of all available cities with basic information.

### GET `/api/cities/:cityKey`
Returns detailed information about a specific city including:
- Coordinates
- Population
- Police stations
- Fire stations
- Hospitals
- Vulnerability data

### POST `/api/simulate`
Runs a disaster simulation.

**Request Body:**
```json
{
  "cityKey": "miami",
  "disasterType": "flood",
  "severity": 7,
  "affectedArea": {
    "center": {
      "lat": 25.7617,
      "lng": -80.1918
    },
    "radius": 5
  }
}
```

**Response:**
- Emergency response data (police, fire, hospitals)
- Response times and distances
- Vulnerability score and factors
- Response timeline

## Real-Time Data Integration

This simulator is designed to integrate with real-time data sources for enhanced accuracy:

- **Traffic Data**: Adjust response times based on current road conditions
- **Weather Data**: Factor in real-time weather affecting emergency response
- **GPS Tracking**: Use actual police/emergency vehicle locations
- **Emergency Calls**: Incorporate active emergency calls to assess resource availability
- **Infrastructure Status**: Account for road closures, bridge conditions, etc.

With real-time data integration, the system can provide:
- Live vulnerability detection
- Proactive risk identification
- Dynamic resource allocation recommendations
- Predictive response planning

## Project Structure

```
CrisisSimulator/
├── server/
│   ├── index.js          # Express server and API routes
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CitySelector.js
│   │   ├── DisasterSelector.js
│   │   ├── MapView.js
│   │   ├── SimulationResults.js
│   │   └── VulnerabilityReport.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json
```

## Presentation for Law Enforcement

This simulator is designed to be presentable to law enforcement agencies and emergency management organizations. Key features for presentations:

1. **Visual Impact**: Modern, professional UI with clear visualizations
2. **Data-Driven**: Vulnerability scores and risk factors backed by calculations
3. **Actionable Insights**: Specific recommendations for improving response
4. **Scalability**: Framework ready for real-time data integration
5. **Real-World Application**: Demonstrates how real-time data can enhance emergency response

## Future Enhancements

- Real-time data API integration
- Historical disaster data analysis
- Multi-disaster scenario simulation
- Resource optimization algorithms
- Export capabilities for reports
- User authentication and saved scenarios
- Mobile-responsive design improvements

## License

MIT

## Author

Created for emergency management and law enforcement agencies to improve disaster response planning and vulnerability assessment.

