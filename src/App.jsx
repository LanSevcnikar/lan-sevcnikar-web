import { Link, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import HeroCanvas from './components/HeroCanvas'
import DemoFrame from './components/DemoFrame'
import { posts as allPosts, postBySlug } from './content/posts'
import { LanguageProvider, localizePost, useLanguage } from './i18n'

const SITE_NAME = 'Lan Sevčnikar'

const dateFormatter = (language, options) =>
  new Intl.DateTimeFormat(language === 'sl' ? 'sl-SI' : 'en', { timeZone: 'UTC', ...options })

const formatDate = (date, language = 'en') =>
  dateFormatter(language, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))

const formatMonthDay = (date, language = 'en') =>
  dateFormatter(language, { month: 'short', day: 'numeric' }).format(new Date(date))

const publishedPosts = allPosts.filter((post) => !post.draft)

// Posts are already sorted newest first, so Map insertion order is newest year first.
const groupByYear = (posts) => {
  const groups = new Map()
  for (const post of posts) {
    const year = new Date(post.date).getUTCFullYear()
    groups.set(year, [...(groups.get(year) ?? []), post])
  }
  return [...groups]
}

// MDX wraps markdown images in <p>, so the figure is built from spans.
// The alt text doubles as the visible caption, so the img itself gets an empty alt.
const Figure = ({ src, alt }) => (
  <span className={/\.svg$/i.test(src) ? 'figure figure--bare' : 'figure'}>
    <img src={src} alt="" loading="lazy" />
    {alt && <span className="figure-caption">{alt}</span>}
  </span>
)

function NotFound({ heading, to, label }) {
  return (
    <section className="page section">
      <title>{`${heading} — ${SITE_NAME}`}</title>
      <h1>{heading}</h1>
      <Link className="text-link" to={to}>{label}</Link>
    </section>
  )
}

function PageNotFound() {
  const { t } = useLanguage()
  return <NotFound heading={t('pageNotFound')} to="/" label={t('backHome')} />
}

function Home() {
  const { t, language } = useLanguage()

  return (
    <>
      <title>{SITE_NAME}</title>
      <section className="hero">
        <HeroCanvas />
        <div className="hero-content">
          <h1>{SITE_NAME}</h1>
          <p>{t('heroIntro')}</p>
          <div className="actions">
            <Link className="button button-primary" to="/blog">{t('readBlog')}</Link>
            <Link className="button" to="/portfolio">{t('viewPortfolio')}</Link>
          </div>
        </div>
      </section>

      <section className="section narrow" aria-label={t('about')}>
        <div className="copy">
          <p>{t('aboutP1')}</p>
          <p>{t('aboutP2')}</p>
          <p>{t('aboutP3')}</p>
          <p>{t('aboutP4')}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t('recentProjects')}</h2>
          <Link to="/blog" className="text-link">{t('allPosts')}</Link>
        </div>
        <div className="featured-grid">
          {publishedPosts.slice(0, 3).map((rawPost) => {
            const post = localizePost(rawPost, language)
            return (
              <Link to={`/blog/${post.slug}`} className="featured-card" key={post.slug}>
                {post.image && <img src={post.image} alt="" width="640" height="400" loading="lazy" />}
                <div className="featured-card-body">
                  <time>{new Date(post.date).getUTCFullYear()}</time>
                  <h3>{post.title}</h3>
                  <small>{post.tags.slice(0, 2).join(' · ')}</small>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

function Blog() {
  const { t, language } = useLanguage()

  return (
    <section className="page section">
      <title>{`${t('blog')} — ${SITE_NAME}`}</title>
      <h1>{t('blogHeading')}</h1>
      <p className="lede">{t('blogIntro')}</p>
      <div className="post-list">
        {groupByYear(publishedPosts).map(([year, yearPosts]) => (
          <section className="year-group" key={year}>
            <h2 className="year">{year}</h2>
            <div className="year-rows">
              {yearPosts.map((rawPost) => {
                const post = localizePost(rawPost, language)
                return (
                  <Link className="post-row" to={`/blog/${post.slug}`} key={post.slug}>
                    <img src={post.image} alt="" width="128" height="84" loading="lazy" />
                    <div>
                      <div className="post-meta">
                        <time>{formatMonthDay(post.date, language)}</time>
                        {post.wip && <em>{t('wip')}</em>}
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <small>{post.tags.join('  /  ')}</small>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

function Post() {
  const { t, language } = useLanguage()
  const { slug } = useParams()
  const post = postBySlug(slug)

  if (!post || post.draft) {
    return <NotFound heading={t('postNotFound')} to="/blog" label={t('backToBlog')} />
  }

  const Content = post.Content
  const localized = localizePost(post, language)

  return (
    <article className="article section narrow">
      <title>{`${localized.title} — ${SITE_NAME}`}</title>
      <Link className="back" to="/blog">← {t('backToBlog')}</Link>
      <div className="article-meta">
        {formatDate(localized.date, language)} · {localized.tags.join(' / ')}
      </div>
      <h1>{localized.title}</h1>
      {localized.externalLink && (
        <a className="article-external" href={localized.externalLink} target="_blank" rel="noreferrer">
          {t('readExternalPost')} ↗
        </a>
      )}
      <p className="lede">{localized.description}</p>
      {localized.image && <img className="article-cover" src={localized.image} alt="" />}
      <Content DemoFrame={DemoFrame} components={{ img: Figure }} />
    </article>
  )
}

function Portfolio() {
  const { t } = useLanguage()

  return (
    <section className="page section">
      <title>{`${t('portfolio')} — ${SITE_NAME}`}</title>
      <h1>{t('portfolioHeading')}</h1>
      <div className="info-grid">
        <div>
          <h3>{t('university')}</h3>
          <small>{t('currentEducation')}</small>
          <p>{t('educationBody')}</p>
        </div>
        <div>
          <h3>Flare · Abelium</h3>
          <small>{t('currentPosition')}</small>
          <p>{t('positionBody')}</p>
        </div>
      </div>
      <div className="section-heading cv-heading">
        <h2>{t('fullCv')}</h2>
        <div className="actions">
          <a className="button button-primary" href="/CV.pdf" target="_blank" rel="noreferrer">{t('openPdf')}</a>
          <a className="button" href="mailto:sevcnikar.lan@gmail.com">{t('emailMe')}</a>
        </div>
      </div>
      <object className="cv" data="/CV.pdf#toolbar=0&view=FitH" type="application/pdf">
        <a href="/CV.pdf">{t('openCvPdf')}</a>
      </object>
    </section>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  )
}
