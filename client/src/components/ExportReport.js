import React from 'react';
import './ExportReport.css';

const ExportReport = ({ simulation, cityData }) => {
  if (!simulation) return null;

  const exportToJSON = () => {
    const report = {
      timestamp: new Date().toISOString(),
      city: simulation.city,
      disasterType: simulation.disasterType,
      severity: simulation.severity,
      affectedArea: simulation.affectedArea,
      vulnerability: simulation.vulnerability,
      emergencyResponse: simulation.emergencyResponse,
      timeline: simulation.timeline
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crisis-report-${simulation.city}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToText = () => {
    const report = `
CRISIS SIMULATION REPORT
========================

Date: ${new Date(simulation.timestamp).toLocaleString()}
City: ${simulation.city}
Disaster Type: ${simulation.disasterType.toUpperCase()}
Severity: ${simulation.severity}/10

VULNERABILITY ANALYSIS
----------------------
Score: ${simulation.vulnerability.score}/100
Level: ${simulation.vulnerability.level}

Risk Factors:
${simulation.vulnerability.factors.map(f => `- ${f.type}: ${f.impact}`).join('\n')}

EMERGENCY RESPONSE
------------------
Police Stations: ${simulation.emergencyResponse.police.length}
Fire Stations: ${simulation.emergencyResponse.fire.length}
Hospitals: ${simulation.emergencyResponse.hospitals.length}

Fastest Response Times:
- Police: ${simulation.emergencyResponse.police.length > 0 ? 
  Math.min(...simulation.emergencyResponse.police.map(p => p.responseTime)) + ' min' : 'N/A'}
- Fire: ${simulation.emergencyResponse.fire.length > 0 ? 
  Math.min(...simulation.emergencyResponse.fire.map(f => f.responseTime)) + ' min' : 'N/A'}
- Medical: ${simulation.emergencyResponse.hospitals.length > 0 ? 
  Math.min(...simulation.emergencyResponse.hospitals.map(h => h.responseTime)) + ' min' : 'N/A'}

TIMELINE
--------
${simulation.timeline.map(e => `${e.time} min: ${e.event}`).join('\n')}

RECOMMENDATIONS
--------------
${simulation.vulnerability.score >= 70 ? 
  'Immediate action required. Deploy additional resources.' :
  simulation.vulnerability.score >= 50 ?
  'Enhanced monitoring recommended.' :
  'Standard protocols should be sufficient.'}
    `.trim();

    const dataBlob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crisis-report-${simulation.city}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-report">
      <h3>📥 Export Report</h3>
      <div className="export-buttons">
        <button onClick={exportToJSON} className="export-button json">
          📄 Export as JSON
        </button>
        <button onClick={exportToText} className="export-button text">
          📝 Export as Text
        </button>
      </div>
    </div>
  );
};

export default ExportReport;

