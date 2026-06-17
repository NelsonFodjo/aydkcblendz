import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center">
          <div>
            <p className="font-semibold text-ink mb-2">Something went wrong.</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="text-lime underline"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
