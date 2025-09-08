'use client';

import React from 'react';

interface Props {
    children: React.ReactNode,
}

interface State {
    hasError: boolean,
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will shwwwwwwow the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{ padding: '20px', border: '1px solid red', color: 'red', textAlign: 'center' }}>
                    <h2>Упс! Сталася помилка.</h2>
                    <p>Ми вже працюємо над вирішенням проблеми.</p>
                </div>
            );
        }
        return this.props.children;
  }

}

export default ErrorBoundary;