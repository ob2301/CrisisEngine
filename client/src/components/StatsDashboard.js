import React from 'react';
import './StatsDashboard.css';

const StatsDashboard = ({ simulation }) => {
  if (!simulation) return null;

  const getFastestResponse = (responses) => {
    if (!responses || responses.length === 0) return null;
    return responses.sort((a, b) => a.responseTime - b.responseTime)[0];
  };

  const fastestPolice = getFastestResponse(simulation.emergencyResponse?.police);
  const fastestFire = getFastestResponse(simulation.emergencyResponse?.fire);
  const fastestHospital = getFastestResponse(simulation.emergencyResponse?.hospitals);

  const totalResources = {
    police: simulation.emergencyResponse?.police?.length || 0,
    fire: simulation.emergencyResponse?.fire?.length || 0,
    medical: simulation.emergencyResponse?.hospitals?.length || 0
  };

  const stats = [
    {
      label: 'Fastest Police Response',
      value: fastestPolice ? `${fastestPolice.responseTime} min` : 'N/A',
      icon: '🚔',
      color: '#2196F3'
    },
    {
      label: 'Fastest Fire Response',
      value: fastestFire ? `${fastestFire.responseTime} min` : 'N/A',
      icon: '🚒',
      color: '#F44336'
    },
    {
      label: 'Fastest Medical Response',
      value: fastestHospital ? `${fastestHospital.responseTime} min` : 'N/A',
      icon: '🏥',
      color: '#4CAF50'
    },
    {
      label: 'Total Resources Available',
      value: totalResources.police + totalResources.fire + totalResources.medical,
      icon: '📊',
      color: '#FF9800'
    },
    {
      label: 'Vulnerability Score',
      value: `${simulation.vulnerability?.score || 0}/100`,
      icon: '⚠️',
      color: simulation.vulnerability?.score >= 70 ? '#F44336' : 
             simulation.vulnerability?.score >= 50 ? '#FF9800' : '#4CAF50'
    },
    {
      label: 'Risk Level',
      value: simulation.vulnerability?.level || 'Unknown',
      icon: '📈',
      color: simulation.vulnerability?.score >= 70 ? '#F44336' : 
             simulation.vulnerability?.score >= 50 ? '#FF9800' : '#4CAF50'
    }
  ];

  return (
    <div className="stats-dashboard">
      <h3>📊 Quick Statistics</h3>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsDashboard;

