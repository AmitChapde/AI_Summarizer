import React from "react";

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error("UI crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Something went wrong.</h2>
          <p>Try refreshing or going back to the home page.</p>
          <button className="back-button" onClick={() => window.location.href = "/"}>
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
