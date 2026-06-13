import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
          <div className="bg-red-950 border-4 border-red-500 rounded-xl p-8 max-w-2xl w-full shadow-2xl">
            <h1 className="text-3xl font-black text-red-500 mb-4 uppercase tracking-tight">App Crashed</h1>
            <p className="text-red-200 mb-4 font-semibold text-lg">
              Something went wrong while rendering the application.
            </p>
            <div className="bg-black/50 p-4 rounded border border-red-900 overflow-x-auto mb-4">
              <pre className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
            </div>
            <details className="text-slate-400 text-sm mt-4 cursor-pointer">
              <summary className="font-bold hover:text-white transition-colors">View Component Stack</summary>
              <pre className="mt-2 whitespace-pre-wrap text-xs bg-black/50 p-4 rounded border border-slate-800">
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-8 bg-red-500 text-white font-black uppercase tracking-wider px-6 py-3 rounded hover:bg-red-600 transition-colors"
            >
              Go to Home Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
