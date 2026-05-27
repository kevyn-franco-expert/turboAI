"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-app flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-serif text-text-primary mb-4">
            Something went wrong
          </h2>
          <p className="text-text-secondary mb-6">
            We&apos;re sorry — an unexpected error occurred.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full border-[1.5px] border-btn-text text-btn-text font-medium text-sm hover:bg-[#F5EFE6] transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
