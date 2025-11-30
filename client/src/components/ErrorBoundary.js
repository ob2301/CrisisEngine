import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>⚠️ Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
            <summary>Error Details (click to expand)</summary>
            <p style={{ color: '#d32f2f', marginTop: '10px' }}>
              {this.state.error && this.state.error.toString()}
            </p>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

