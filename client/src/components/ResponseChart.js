import React from 'react';
import './ResponseChart.css';

const ResponseChart = ({ data, title, color }) => {
  if (!data || data.length === 0) return null;

  const maxTime = Math.max(...data.map(item => item.responseTime), 30);
  
  return (
    <div className="response-chart">
      <h4>{title}</h4>
      <div className="chart-bars">
        {data.slice(0, 5).map((item, idx) => {
          const percentage = (item.responseTime / maxTime) * 100;
          return (
            <div key={item.id || idx} className="chart-bar-container">
              <div className="chart-bar-label">{item.name}</div>
              <div className="chart-bar-wrapper">
                <div 
                  className="chart-bar" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                >
                  <span className="chart-bar-value">{item.responseTime} min</span>
                </div>
              </div>
              <div className="chart-bar-details">
                <span>{item.distance} km</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResponseChart;

