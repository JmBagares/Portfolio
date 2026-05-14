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