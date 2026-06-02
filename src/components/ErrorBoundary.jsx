import { Component } from 'react'

/**
 * Catches render/runtime errors in its subtree so a failing WebGL effect
 * (three.js / ogl shaders, postprocessing) degrades gracefully instead of
 * white-screening the whole page. Renders an optional `fallback` (or nothing)
 * when an error is caught.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] caught an error:', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }

    return this.props.children
  }
}
