import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import themes, { THEME_DEFAULT } from './themeConfig'

const ThemeContext = createContext(null)

/**
 * Read the current theme from context.
 * Returns { themeId, theme, setThemeSource }
 *   themeId      – string key in themeConfig (e.g. 'happiness')
 *   theme        – the full config object for the active theme
 *   setThemeSource – call with { songId } to trigger theme changes
 */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(THEME_DEFAULT)
  const prevBodyClass = useRef('')

  /* Derive the resolved theme object, always a valid object */
  const theme = useMemo(() => themes[themeId] || themes[THEME_DEFAULT], [themeId])

  /**
   * Called by VinylPlayer (or anything else) to signal a theme change.
   * If songId maps to a known theme → activate it.
   * Otherwise → revert to default.
   */
  const setThemeSource = useCallback(({ songId }) => {
    if (songId && themes[songId]) {
      setThemeId(songId)
    } else {
      setThemeId(THEME_DEFAULT)
    }
  }, [])

  /* ── Apply CSS custom properties on #root ──────────────────── */
  useEffect(() => {
    const documentRoot = document.documentElement
    const root = document.getElementById('root')

    const vars = theme.css
    for (const [key, value] of Object.entries(vars)) {
      documentRoot.style.setProperty(key, value)
      root?.style.setProperty(key, value)
    }
  }, [theme])

  /* ── Apply body class for per-theme global selectors ──────── */
  useEffect(() => {
    const body = document.body

    // Remove previous theme class
    if (prevBodyClass.current) {
      body.classList.remove(prevBodyClass.current)
    }

    // Add new theme class
    if (theme.bodyClass) {
      body.classList.add(theme.bodyClass)
    }

    prevBodyClass.current = theme.bodyClass
  }, [theme])

  const value = useMemo(() => ({
    themeId,
    theme,
    setThemeSource,
  }), [themeId, theme, setThemeSource])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
