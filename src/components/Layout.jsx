import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n'

const LANGUAGES = ['en', 'sl']

export default function Layout({ children }) {
  const { language, setLanguage, t } = useLanguage()
  const { pathname } = useLocation()

  useEffect(() => {
    // 'instant' so the global smooth scroll-behavior doesn't animate route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <Link className="brand" to="/">
          <span />
          Lan Sevčnikar
        </Link>
        <nav aria-label={t('navLabel')}>
          <NavLink to="/" end>{t('about')}</NavLink>
          <NavLink to="/blog">{t('blog')}</NavLink>
          <NavLink to="/portfolio">{t('portfolio')}</NavLink>
        </nav>
        <div className="language-toggle" role="group" aria-label={t('languageLabel')}>
          {LANGUAGES.map((code) => (
            <button
              key={code}
              type="button"
              lang={code}
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <span>© {new Date().getFullYear()} Lan Sevčnikar</span>
        <div>
          <a href="mailto:sevcnikar.lan@gmail.com">{t('footerEmail')}</a>
          <a href="https://github.com/LanSevcnikar" target="_blank" rel="noreferrer">{t('footerGithub')}</a>
        </div>
      </footer>
    </div>
  )
}
