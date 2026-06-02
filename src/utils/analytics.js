const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

let analyticsInitialized = false

function getWindow() {
  if (typeof window === 'undefined') {
    return null
  }

  return window
}

export function initializeAnalytics() {
  const currentWindow = getWindow()

  if (!currentWindow || !GA_MEASUREMENT_ID || analyticsInitialized) {
    return
  }

  currentWindow.dataLayer = currentWindow.dataLayer || []
  currentWindow.gtag = currentWindow.gtag || function gtag() {
    currentWindow.dataLayer.push(arguments)
  }

  if (!document.querySelector(`script[data-ga4-id="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.dataset.ga4Id = GA_MEASUREMENT_ID
    document.head.appendChild(script)
  }

  currentWindow.gtag('js', new Date())
  currentWindow.gtag('config', GA_MEASUREMENT_ID, {
    page_path: currentWindow.location.pathname + currentWindow.location.search,
  })

  analyticsInitialized = true
}

export function analyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID)
}

/**
 * Send a custom analytics event.
 * Fires to GA4 if configured, and logs to console in development.
 */
export function trackEvent(eventName, params = {}) {
  const currentWindow = getWindow()

  if (!currentWindow) {
    return
  }

  // Fire to GA4 if available
  if (currentWindow.gtag && GA_MEASUREMENT_ID) {
    currentWindow.gtag('event', eventName, params)
  }

  // Log in development for debugging
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, params)
  }
}

/**
 * Track scroll depth milestones at 25%, 50%, 75%, and 100%.
 * Each milestone fires only once per page load.
 * Call this once on mount; it self-manages the listener cleanup.
 */
export function initScrollDepthTracking() {
  const currentWindow = getWindow()

  if (!currentWindow) {
    return () => {}
  }

  const milestones = [25, 50, 75, 100]
  const reached = new Set()

  const handleScroll = () => {
    const scrollTop = currentWindow.scrollY || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - currentWindow.innerHeight

    if (docHeight <= 0) {
      return
    }

    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    for (const milestone of milestones) {
      if (scrollPercent >= milestone && !reached.has(milestone)) {
        reached.add(milestone)
        trackEvent('scroll_depth', {
          depth_percentage: milestone,
          depth_label: `${milestone}%`,
        })
      }
    }

    // All milestones reached, stop listening
    if (reached.size === milestones.length) {
      currentWindow.removeEventListener('scroll', handleScroll)
    }
  }

  currentWindow.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    currentWindow.removeEventListener('scroll', handleScroll)
  }
}