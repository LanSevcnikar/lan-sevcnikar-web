import { Link, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import HeroCanvas from './components/HeroCanvas'
import DemoFrame from './components/DemoFrame'
import { posts as allPosts, postBySlug } from './content/posts'
import { LanguageProvider, localizePost, useLanguage } from './i18n'

const SectionLabel = ({ children }) => <div className="eyebrow"><span />{children}</div>
const formatDate = (date, language = 'en') => new Intl.DateTimeFormat(language === 'sl' ? 'sl-SI' : 'en', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))

function Home() {
  const { t, language } = useLanguage()
  const posts = allPosts.filter((post) => !post.draft)
  return <>
    <section className="hero"><HeroCanvas /><div className="hero-content"><SectionLabel>{t('heroEyebrow')}</SectionLabel><h1>Lan Sevčnikar</h1><p>{t('heroIntro')}</p><div className="actions"><Link className="button button-primary" to="/blog">{t('readBlog')}</Link><Link className="button" to="/portfolio">{t('viewPortfolio')}</Link></div></div><div className="scroll-hint"><i />{t('scroll')}</div></section>
    <section className="section narrow"><SectionLabel>{t('about')}</SectionLabel><h2>{t('aboutHeading')}</h2><div className="copy"><p>{t('aboutP1')}</p><p>{t('aboutP2')}</p><p>{t('aboutP3')}</p><p>{t('aboutP4')}</p></div><div className="facts"><span>{t('factSlovenia')}</span><span>{t('factMachineLearning')}</span><span>{t('factDataScience')}</span><span>{t('factExperience')}</span></div></section>
    <section className="section"><div className="section-heading"><div><SectionLabel>{t('selectedWork')}</SectionLabel><h2>{t('recentProjects')}</h2></div><Link to="/blog" className="text-link">{t('allPosts')}</Link></div><div className="featured-grid">{posts.slice(0, 3).map((rawPost, index) => { const post = localizePost(rawPost, language); return <Link to={`/blog/${post.slug}`} className="featured-card" key={post.slug}><div><b>0{index + 1}</b><time>{new Date(post.date).getFullYear()}</time></div><h3>{post.title}</h3><small>{post.tags.slice(0, 2).join(' · ')}</small></Link> })}</div></section>
  </>
}

function Blog() {
  const { t, language } = useLanguage()
  const posts = allPosts.filter((post) => !post.draft)
  return <section className="page section"><SectionLabel>{t('writingProjects')}</SectionLabel><h1>{t('thingsBuilt')}</h1><p className="lede">{t('blogIntro')}</p><div className="post-list">{posts.map((rawPost, index) => { const post = localizePost(rawPost, language); return <Link className="post-row" to={`/blog/${post.slug}`} key={post.slug}><img src={post.image} alt="" /><div><div className="post-meta"><span>{String(index + 1).padStart(2, '0')}</span><time>{formatDate(post.date, language)}</time>{post.wip && <em>{t('wip')}</em>}</div><h2>{post.title}</h2><p>{post.description}</p><small>{post.tags.join('  /  ')}</small></div><strong>↗</strong></Link> })}</div></section>
}

function Post() {
  const { t, language } = useLanguage()
  const { slug } = useParams()
  const post = postBySlug(slug)
  if (!post || post.draft) return <section className="section page"><h1>{t('postNotFound')}</h1><Link to="/blog">{t('backToBlog')}</Link></section>
  const Content = post.Content
  const localized = localizePost(post, language)
  return <article className="article section narrow"><Link className="back" to="/blog">← {t('backToBlog')}</Link><div className="article-meta">{formatDate(localized.date, language)} · {localized.tags.join(' / ')}</div><h1>{localized.title}</h1>{localized.externalLink && <a className="article-external" href={localized.externalLink} target="_blank" rel="noreferrer">{t('readExternalPost')} ↗</a>}<p className="lede">{localized.description}</p>{localized.image && <img className="article-cover" src={localized.image} alt="" />}<Content DemoFrame={DemoFrame} /></article>
}

function Portfolio() {
  const { t } = useLanguage()
  return <section className="page section"><SectionLabel>{t('portfolio')}</SectionLabel><h1>{t('portfolioHeading')}</h1><div className="info-grid"><div><SectionLabel>{t('currentEducation')}</SectionLabel><h3>{t('university')}</h3><p>{t('educationBody')}</p></div><div><SectionLabel>{t('currentPosition')}</SectionLabel><h3>Flare · Abelium</h3><p>{t('positionBody')}</p></div></div><div className="section-heading cv-heading"><div><SectionLabel>{t('cv')}</SectionLabel><h2>{t('fullCv')}</h2></div><div className="actions"><a className="button button-primary" href="/CV.pdf" target="_blank" rel="noreferrer">{t('openPdf')}</a><a className="button" href="mailto:sevcnikar.lan@gmail.com">{t('emailMe')}</a></div></div><object className="cv" data="/CV.pdf#toolbar=0&view=FitH" type="application/pdf"><a href="/CV.pdf">{t('openCvPdf')}</a></object></section>
}

export default function App() { return <LanguageProvider><Layout><Routes><Route path="/" element={<Home />} /><Route path="/blog" element={<Blog />} /><Route path="/blog/:slug" element={<Post />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="*" element={<Home />} /></Routes></Layout></LanguageProvider> }
