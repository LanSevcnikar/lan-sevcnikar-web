import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n'

export default function Layout({ children }) {
  const { language, setLanguage, t } = useLanguage()
  const nextLanguage = language === 'en' ? 'sl' : 'en'
  return <div className="site-shell">
    <header className="nav-wrap">
      <Link className="brand" to="/"><span />Lan Sevčnikar</Link>
      <nav aria-label={t('navLabel')}>
        <NavLink to="/" end>{t('about')}</NavLink>
        <NavLink to="/blog">{t('blog')}</NavLink>
        <NavLink to="/portfolio">{t('portfolio')}</NavLink>
      </nav>
      <button className="language-toggle" type="button" onClick={() => setLanguage(nextLanguage)} aria-label={language === 'en' ? t('switchToSlovenian') : t('switchToEnglish')} title={t('languageLabel')}>
        <span aria-hidden="true">{language === 'en' ? '🇸🇮' : '🇬🇧'}</span><span className="language-code">{language === 'en' ? 'SL' : 'EN'}</span>
      </button>
    </header>
    <main>{children}</main>
    <footer><span>© {new Date().getFullYear()} Lan Sevčnikar</span><div><a href="mailto:sevcnikar.lan@gmail.com">{t('footerEmail')}</a><a href="https://github.com/LanSevcnikar" target="_blank" rel="noreferrer">{t('footerGithub')}</a></div></footer>
  </div>
}
