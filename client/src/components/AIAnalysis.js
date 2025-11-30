import React, { useState } from 'react';
import './AIAnalysis.css';

const AIAnalysis = ({ aiAnalysis, simulation }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!aiAnalysis) return null;

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return '#F44336';
      case 'HIGH': return '#FF9800';
      case 'MEDIUM': return '#FFC107';
      default: return '#4CAF50';
    }
  };

  return (
    <div className="card ai-analysis">
      <div className="ai-header">
        <h2>🤖 AI Agent Analysis</h2>
        <div className="ai-badge">
          <span className="ai-icon">🧠</span>
          <span className="ai-type">{aiAnalysis.agentType}</span>
        </div>
      </div>

      {/* AI Insights */}
      {aiAnalysis.insights && aiAnalysis.insights.length > 0 && (
        <div className="ai-section">
          <div 
            className="ai-section-header"
            onClick={() => toggleSection('insights')}
          >
            <h3>💡 AI Insights</h3>
            <span className="toggle-icon">{expandedSection === 'insights' ? '▼' : '▶'}</span>
          </div>
          {expandedSection === 'insights' && (
            <div className="ai-section-content">
              {aiAnalysis.insights.map((insight, idx) => (
                <div key={idx} className="insight-item" style={{ borderLeftColor: getPriorityColor(insight.priority) }}>
                  <div className="insight-header">
                    <span className="insight-type">{insight.type.toUpperCase()}</span>
                    <span 
                      className="insight-priority"
                      style={{ backgroundColor: getPriorityColor(insight.priority) + '20', color: getPriorityColor(insight.priority) }}
                    >
                      {insight.priority}
                    </span>
                  </div>
                  <p className="insight-message">{insight.message}</p>
                  {insight.suggestion && (
                    <p className="insight-suggestion">💡 {insight.suggestion}</p>
                  )}
                  {insight.impact && (
                    <p className="insight-impact">📊 Impact: {insight.impact}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Recommendations */}
      {aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0 && (
        <div className="ai-section">
          <div 
            className="ai-section-header"
            onClick={() => toggleSection('recommendations')}
          >
            <h3>📋 Strategic Recommendations</h3>
            <span className="toggle-icon">{expandedSection === 'recommendations' ? '▼' : '▶'}</span>
          </div>
          {expandedSection === 'recommendations' && (
            <div className="ai-section-content">
              {aiAnalysis.recommendations.map((rec, idx) => (
                <div key={idx} className="recommendation-item">
                  <div className="recommendation-header">
                    <span className="recommendation-category">{rec.category}</span>
                    <span 
                      className="recommendation-priority"
                      style={{ backgroundColor: getPriorityColor(rec.priority) + '20', color: getPriorityColor(rec.priority) }}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <h4 className="recommendation-action">{rec.action}</h4>
                  <p className="recommendation-rationale">📌 {rec.rationale}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Risk Assessment */}
      {aiAnalysis.riskAssessment && (
        <div className="ai-section">
          <div 
            className="ai-section-header"
            onClick={() => toggleSection('risk')}
          >
            <h3>⚠️ AI Risk Assessment</h3>
            <span className="toggle-icon">{expandedSection === 'risk' ? '▼' : '▶'}</span>
          </div>
          {expandedSection === 'risk' && (
            <div className="ai-section-content">
              <div className="risk-assessment">
                <div className="risk-score">
                  <span className="risk-score-value" style={{ color: getPriorityColor(aiAnalysis.riskAssessment.level) }}>
                    {aiAnalysis.riskAssessment.score}/100
                  </span>
                  <span className="risk-level" style={{ color: getPriorityColor(aiAnalysis.riskAssessment.level) }}>
                    {aiAnalysis.riskAssessment.level} RISK
                  </span>
                </div>
                <p className="risk-assessment-text">{aiAnalysis.riskAssessment.assessment}</p>
                {aiAnalysis.riskAssessment.factors && aiAnalysis.riskAssessment.factors.length > 0 && (
                  <div className="risk-factors">
                    <strong>Risk Factors:</strong>
                    <ul>
                      {aiAnalysis.riskAssessment.factors.map((factor, idx) => (
                        <li key={idx}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resource Optimization */}
      {aiAnalysis.resourceOptimization && aiAnalysis.resourceOptimization.length > 0 && (
        <div className="ai-section">
          <div 
            className="ai-section-header"
            onClick={() => toggleSection('optimization')}
          >
            <h3>⚙️ Resource Optimization</h3>
            <span className="toggle-icon">{expandedSection === 'optimization' ? '▼' : '▶'}</span>
          </div>
          {expandedSection === 'optimization' && (
            <div className="ai-section-content">
              {aiAnalysis.resourceOptimization.map((opt, idx) => (
                <div key={idx} className="optimization-item">
                  <div className="optimization-header">
                    <span className="optimization-type">{opt.type}</span>
                    <span className="optimization-feasibility">{opt.feasibility} Feasibility</span>
                  </div>
                  <h4>{opt.suggestion}</h4>
                  <div className="optimization-details">
                    <span className="optimization-impact">📈 Impact: {opt.impact}</span>
                    <span className="optimization-cost">💰 Cost: {opt.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scenario Comparison */}
      {aiAnalysis.scenarioComparison && (
        <div className="ai-section">
          <div 
            className="ai-section-header"
            onClick={() => toggleSection('scenarios')}
          >
            <h3>📊 Scenario Comparison</h3>
            <span className="toggle-icon">{expandedSection === 'scenarios' ? '▼' : '▶'}</span>
          </div>
          {expandedSection === 'scenarios' && (
            <div className="ai-section-content">
              <div className="scenario-comparison">
                <div className="scenario-current">
                  <h4>Current Scenario</h4>
                  <div className="scenario-metrics">
                    <span>Vulnerability: {aiAnalysis.scenarioComparison.current.vulnerability}/100</span>
                    <span>Level: {aiAnalysis.scenarioComparison.current.level}</span>
                  </div>
                </div>
                <div className="scenario-arrow">→</div>
                <div className="scenario-optimal">
                  <h4>Optimal Scenario</h4>
                  <div className="scenario-metrics">
                    <span>Vulnerability: {aiAnalysis.scenarioComparison.optimal.vulnerability}/100</span>
                    <span>Level: {aiAnalysis.scenarioComparison.optimal.level}</span>
                  </div>
                </div>
              </div>
              <div className="improvement-potential">
                <strong>Improvement Potential:</strong> {aiAnalysis.scenarioComparison.improvementPotential}
              </div>
              {aiAnalysis.scenarioComparison.optimal.improvements && (
                <div className="improvement-suggestions">
                  {aiAnalysis.scenarioComparison.optimal.improvements.map((improvement, idx) => (
                    <p key={idx}>✨ {improvement}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;

