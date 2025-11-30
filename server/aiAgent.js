// AI Agent System for Crisis Simulator
// Provides intelligent analysis, recommendations, and predictive insights

class CrisisAIAgent {
  constructor() {
    this.agentType = 'Emergency Response Coordinator';
    this.capabilities = [
      'vulnerability_analysis',
      'resource_optimization',
      'scenario_prediction',
      'strategic_planning',
      'risk_assessment'
    ];
  }

  // Analyze simulation results and provide AI insights
  analyzeSimulation(simulation, cityData) {
    const analysis = {
      timestamp: new Date().toISOString(),
      agentType: this.agentType,
      insights: [],
      recommendations: [],
      riskAssessment: null,
      resourceOptimization: null,
      scenarioComparison: null
    };

    // Vulnerability Analysis
    const vulnScore = simulation.vulnerability?.score || 0;
    if (vulnScore >= 70) {
      analysis.insights.push({
        type: 'critical',
        message: 'AI Analysis: Critical vulnerability detected. Immediate intervention required.',
        priority: 'HIGH',
        impact: 'Area has insufficient emergency coverage for this disaster scenario.'
      });
    } else if (vulnScore >= 50) {
      analysis.insights.push({
        type: 'warning',
        message: 'AI Analysis: Elevated risk level. Enhanced monitoring recommended.',
        priority: 'MEDIUM',
        impact: 'Response times may be suboptimal during peak emergency conditions.'
      });
    }

    // Response Time Analysis
    const policeTimes = simulation.emergencyResponse?.police?.map(p => p.responseTime) || [];
    const fireTimes = simulation.emergencyResponse?.fire?.map(f => f.responseTime) || [];
    const medicalTimes = simulation.emergencyResponse?.hospitals?.map(h => h.responseTime) || [];

    const avgPoliceTime = policeTimes.length > 0 
      ? policeTimes.reduce((a, b) => a + b, 0) / policeTimes.length 
      : null;
    const avgFireTime = fireTimes.length > 0 
      ? fireTimes.reduce((a, b) => a + b, 0) / fireTimes.length 
      : null;
    const avgMedicalTime = medicalTimes.length > 0 
      ? medicalTimes.reduce((a, b) => a + b, 0) / medicalTimes.length 
      : null;

    // AI Response Time Assessment
    if (avgPoliceTime && avgPoliceTime > 20) {
      analysis.insights.push({
        type: 'performance',
        message: `AI Analysis: Police response time (${avgPoliceTime.toFixed(1)} min) exceeds optimal threshold.`,
        priority: 'MEDIUM',
        suggestion: 'Consider pre-positioning units or establishing temporary stations in high-risk areas.'
      });
    }

    if (avgFireTime && avgFireTime > 15) {
      analysis.insights.push({
        type: 'performance',
        message: `AI Analysis: Fire response time (${avgFireTime.toFixed(1)} min) may impact containment effectiveness.`,
        priority: 'HIGH',
        suggestion: 'Fire response is critical - recommend additional fire stations or mobile units.'
      });
    }

    if (avgMedicalTime && avgMedicalTime > 25) {
      analysis.insights.push({
        type: 'performance',
        message: `AI Analysis: Medical response time (${avgMedicalTime.toFixed(1)} min) could affect patient outcomes.`,
        priority: 'HIGH',
        suggestion: 'Consider establishing temporary medical facilities or ambulance staging areas.'
      });
    }

    // Resource Coverage Analysis
    const totalResources = {
      police: simulation.emergencyResponse?.police?.length || 0,
      fire: simulation.emergencyResponse?.fire?.length || 0,
      medical: simulation.emergencyResponse?.hospitals?.length || 0
    };

    if (totalResources.police === 0) {
      analysis.insights.push({
        type: 'coverage',
        message: 'AI Analysis: No police coverage in affected area - critical gap identified.',
        priority: 'CRITICAL',
        suggestion: 'Immediate deployment of mobile units or coordination with neighboring jurisdictions required.'
      });
    }

    if (totalResources.fire === 0) {
      analysis.insights.push({
        type: 'coverage',
        message: 'AI Analysis: No fire coverage in affected area - extreme risk.',
        priority: 'CRITICAL',
        suggestion: 'Emergency fire response must be established before disaster occurs.'
      });
    }

    // AI Strategic Recommendations
    analysis.recommendations = this.generateRecommendations(simulation, cityData, totalResources);

    // Risk Assessment
    analysis.riskAssessment = this.assessRisk(simulation, avgPoliceTime, avgFireTime, avgMedicalTime);

    // Resource Optimization Suggestions
    analysis.resourceOptimization = this.optimizeResources(simulation, cityData);

    // Scenario Comparison
    analysis.scenarioComparison = this.compareScenarios(simulation);

    return analysis;
  }

  generateRecommendations(simulation, cityData, resources) {
    const recommendations = [];
    const severity = simulation.severity || 5;
    const disasterType = simulation.disasterType;

    // Severity-based recommendations
    if (severity >= 8) {
      recommendations.push({
        category: 'Immediate Action',
        action: 'Activate emergency operations center immediately',
        rationale: 'High severity disaster requires full-scale emergency response coordination',
        priority: 'CRITICAL'
      });
    }

    // Resource-based recommendations
    if (resources.police < 2) {
      recommendations.push({
        category: 'Resource Deployment',
        action: 'Deploy additional police units from neighboring precincts',
        rationale: 'Insufficient police coverage for effective disaster response',
        priority: 'HIGH'
      });
    }

    if (resources.fire < 2) {
      recommendations.push({
        category: 'Resource Deployment',
        action: 'Request mutual aid from adjacent fire departments',
        rationale: 'Fire response capability is below minimum threshold',
        priority: 'CRITICAL'
      });
    }

    // Disaster-specific recommendations
    if (disasterType === 'flood') {
      recommendations.push({
        category: 'Disaster-Specific',
        action: 'Pre-position water rescue equipment and establish evacuation routes',
        rationale: 'Flood scenarios require specialized equipment and clear evacuation planning',
        priority: 'HIGH'
      });
    } else if (disasterType === 'hurricane') {
      recommendations.push({
        category: 'Disaster-Specific',
        action: 'Establish emergency shelters and secure critical infrastructure',
        rationale: 'Hurricanes require long-term planning and shelter coordination',
        priority: 'HIGH'
      });
    } else if (disasterType === 'earthquake') {
      recommendations.push({
        category: 'Disaster-Specific',
        action: 'Deploy search and rescue teams and assess structural damage',
        rationale: 'Earthquakes require specialized search and rescue capabilities',
        priority: 'CRITICAL'
      });
    }

    // Communication recommendations
    recommendations.push({
      category: 'Communication',
      action: 'Establish unified command structure and communication protocols',
      rationale: 'Effective coordination requires clear communication channels',
      priority: 'MEDIUM'
    });

    return recommendations;
  }

  assessRisk(simulation, avgPolice, avgFire, avgMedical) {
    let riskScore = 0;
    const factors = [];

    // Response time risk
    if (avgPolice && avgPolice > 20) {
      riskScore += 25;
      factors.push('Slow police response time');
    }
    if (avgFire && avgFire > 15) {
      riskScore += 30;
      factors.push('Slow fire response time');
    }
    if (avgMedical && avgMedical > 25) {
      riskScore += 25;
      factors.push('Slow medical response time');
    }

    // Coverage risk
    const coverage = {
      police: simulation.emergencyResponse?.police?.length || 0,
      fire: simulation.emergencyResponse?.fire?.length || 0,
      medical: simulation.emergencyResponse?.hospitals?.length || 0
    };

    if (coverage.police === 0) riskScore += 20;
    if (coverage.fire === 0) riskScore += 20;
    if (coverage.medical === 0) riskScore += 15;

    // Severity risk
    const severity = simulation.severity || 5;
    riskScore += severity * 2;

    const riskLevel = riskScore >= 70 ? 'CRITICAL' : 
                     riskScore >= 50 ? 'HIGH' : 
                     riskScore >= 30 ? 'MEDIUM' : 'LOW';

    return {
      score: Math.min(100, riskScore),
      level: riskLevel,
      factors: factors,
      assessment: this.getRiskAssessment(riskLevel)
    };
  }

  getRiskAssessment(level) {
    const assessments = {
      'CRITICAL': 'Immediate action required. Area is critically vulnerable and requires emergency resource deployment.',
      'HIGH': 'Significant risk present. Enhanced monitoring and resource pre-positioning recommended.',
      'MEDIUM': 'Moderate risk level. Standard emergency protocols should be sufficient with monitoring.',
      'LOW': 'Low risk level. Area appears well-prepared for this disaster scenario.'
    };
    return assessments[level] || assessments['LOW'];
  }

  optimizeResources(simulation, cityData) {
    const optimizations = [];
    const affectedArea = simulation.affectedArea;

    // Analyze resource distribution
    const policeStations = cityData?.policeStations || [];
    const fireStations = cityData?.fireStations || [];

    // Find gaps in coverage
    const nearbyPolice = policeStations.filter(ps => {
      const distance = this.calculateDistance(
        affectedArea.center.lat, affectedArea.center.lng,
        ps.lat, ps.lng
      );
      return distance <= affectedArea.radius + 5;
    });

    const nearbyFire = fireStations.filter(fs => {
      const distance = this.calculateDistance(
        affectedArea.center.lat, affectedArea.center.lng,
        fs.lat, fs.lng
      );
      return distance <= affectedArea.radius + 5;
    });

    if (nearbyPolice.length < 2) {
      optimizations.push({
        type: 'Resource Placement',
        suggestion: 'Consider establishing a temporary police command post within the affected area',
        impact: 'Would reduce response time by 40-60%',
        feasibility: 'HIGH',
        cost: 'LOW'
      });
    }

    if (nearbyFire.length < 2) {
      optimizations.push({
        type: 'Resource Placement',
        suggestion: 'Deploy mobile fire units to strategic locations around the affected area',
        impact: 'Would improve fire response time by 50-70%',
        feasibility: 'MEDIUM',
        cost: 'MEDIUM'
      });
    }

    // Traffic optimization
    optimizations.push({
      type: 'Traffic Management',
      suggestion: 'Establish emergency vehicle corridors and traffic control points',
      impact: 'Would reduce response times by 15-25% during peak traffic',
      feasibility: 'HIGH',
      cost: 'LOW'
    });

    return optimizations;
  }

  compareScenarios(simulation) {
    // AI agent compares current scenario with optimal scenarios
    const currentVuln = simulation.vulnerability?.score || 0;
    const optimalVuln = Math.max(0, currentVuln - 30); // AI estimates optimal scenario

    return {
      current: {
        vulnerability: currentVuln,
        level: simulation.vulnerability?.level || 'Unknown'
      },
      optimal: {
        vulnerability: optimalVuln,
        level: optimalVuln >= 70 ? 'Critical' : optimalVuln >= 50 ? 'High' : optimalVuln >= 30 ? 'Medium' : 'Low',
        improvements: this.getImprovementSuggestions(currentVuln, optimalVuln)
      },
      gap: currentVuln - optimalVuln,
      improvementPotential: `${((currentVuln - optimalVuln) / currentVuln * 100).toFixed(0)}% reduction possible`
    };
  }

  getImprovementSuggestions(current, optimal) {
    const improvements = [];
    if (current - optimal > 20) {
      improvements.push('Significant improvement possible through resource optimization');
      improvements.push('Strategic resource placement could reduce vulnerability substantially');
    }
    return improvements;
  }

  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Predictive analysis - simulate different scenarios
  predictScenarios(cityKey, disasterType, baseSimulation) {
    const scenarios = [];

    // Scenario 1: Increased severity
    scenarios.push({
      name: 'Escalated Severity',
      description: 'What if severity increases to 10?',
      predictedVulnerability: Math.min(100, (baseSimulation.vulnerability?.score || 0) + 20),
      predictedImpact: 'Response times would increase by 30-40%, requiring additional resources'
    });

    // Scenario 2: Resource reduction
    scenarios.push({
      name: 'Resource Constraint',
      description: 'What if 50% of resources are unavailable?',
      predictedVulnerability: Math.min(100, (baseSimulation.vulnerability?.score || 0) + 35),
      predictedImpact: 'Critical coverage gaps would emerge, requiring mutual aid'
    });

    // Scenario 3: Optimal conditions
    scenarios.push({
      name: 'Optimal Response',
      description: 'What if all resources are optimally positioned?',
      predictedVulnerability: Math.max(0, (baseSimulation.vulnerability?.score || 0) - 30),
      predictedImpact: 'Response times could improve by 40-50% with strategic positioning'
    });

    return scenarios;
  }
}

module.exports = CrisisAIAgent;

