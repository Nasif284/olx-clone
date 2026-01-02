import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
          <div style={{ padding: "1rem", color: "red", width: "100vw", height: "100vh", display: "flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
            <h2>Something went wrong.</h2>
            <p>{this.state.error?.message || "An unexpected error occurred."}</p>
          </div>
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
