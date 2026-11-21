import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const translations = {
  en: {
    about: 'About', blog: 'Blog', portfolio: 'Portfolio',
    navLabel: 'Primary navigation', languageLabel: 'Language',
    heroIntro: 'I make computers do stuff — mostly machine learning, data analysis, blockchain analysis, and research papers.',
    readBlog: 'Read the blog', viewPortfolio: 'View portfolio & CV',
    aboutP1: 'I’m from Maribor, Slovenia. I have a bachelor’s degree in Computer Science and Mathematics from the University of Ljubljana.', aboutP2: 'I’m now in the joint master’s programme in Computer Science and Mathematics, run by the Faculty of Mathematics and Physics and the Faculty of Computer and Information Science. I’m also doing a master’s in Quantitative Finance and Actuarial Science at the Faculty of Economics.', aboutP3: 'For over two years I’ve worked at Abelium as a computer scientist and data scientist, on Flare data analysis and crypto research.', aboutP4: 'This site started years ago, when I was more into web design. These days it’s mostly a place to write up my projects.',
    recentProjects: 'Recent projects', allPosts: 'All posts →',
    blogHeading: 'Projects', blogIntro: 'Write-ups of my projects, mostly machine learning, with some algorithms and graphics thrown in.', wip: 'WIP',
    postNotFound: 'Post not found', pageNotFound: 'Page not found', backToBlog: 'Back to blog', backHome: 'Back to home', readExternalPost: 'Read the original Medium post',
    portfolioHeading: 'Education and work', currentEducation: 'Current education', currentPosition: 'Current position', university: 'University of Ljubljana', educationBody: 'Master’s in Computer Science and Mathematics (joint programme of the Faculty of Mathematics and Physics and the Faculty of Computer and Information Science) and Master’s in Quantitative Finance and Actuarial Science (Faculty of Economics). Bachelor’s in Computer Science and Mathematics, same university.', positionBody: 'Computer scientist and data scientist, working on Flare data analysis and crypto research. Over two years so far.', fullCv: 'CV', openPdf: 'Open PDF ↗', emailMe: 'Email me', openCvPdf: 'Open CV PDF',
    footerEmail: 'email', footerGithub: 'github',
  },
  sl: {
    about: 'O meni', blog: 'Blog', portfolio: 'Portfelj',
    navLabel: 'Glavna navigacija', languageLabel: 'Jezik',
    heroIntro: 'Računalnikom naročam, kaj naj počnejo — večinoma strojno učenje, analiza podatkov, analiza verig blokov in raziskovalni članki.',
    readBlog: 'Preberi blog', viewPortfolio: 'Oglej si portfelj in življenjepis',
    aboutP1: 'Prihajam iz Maribora. Diplomiral sem iz računalništva in matematike na Univerzi v Ljubljani.', aboutP2: 'Zdaj sem na skupnem magistrskem programu Računalništvo in matematika, ki ga izvajata Fakulteta za matematiko in fiziko ter Fakulteta za računalništvo in informatiko. Poleg tega obiskujem magistrski program Kvantitativne finance in aktuarske znanosti na Ekonomski fakulteti.', aboutP3: 'Več kot dve leti delam v podjetju Abelium kot računalničar in podatkovni znanstvenik, na analizi podatkov Flare in raziskovanju kriptovalut.', aboutP4: 'Stran je nastala pred leti, ko me je bolj zanimalo spletno oblikovanje. Zdaj je predvsem prostor, kjer opisujem svoje projekte.',
    recentProjects: 'Novejši projekti', allPosts: 'Vsi zapisi →',
    blogHeading: 'Projekti', blogIntro: 'Zapisi o mojih projektih, večinoma s področja strojnega učenja, z nekaj algoritmi in grafiko za povrh.', wip: 'V DELU',
    postNotFound: 'Zapisa ni mogoče najti', pageNotFound: 'Strani ni mogoče najti', backToBlog: 'Nazaj na blog', backHome: 'Nazaj na začetno stran', readExternalPost: 'Preberi izvirni zapis na Mediumu',
    portfolioHeading: 'Izobrazba in delo', currentEducation: 'Trenutno izobraževanje', currentPosition: 'Trenutno delovno mesto', university: 'Univerza v Ljubljani', educationBody: 'Magistrski program Računalništvo in matematika (skupni program Fakultete za matematiko in fiziko ter Fakultete za računalništvo in informatiko) in magistrski program Kvantitativne finance in aktuarske znanosti (Ekonomska fakulteta). Diploma iz računalništva in matematike na isti univerzi.', positionBody: 'Računalničar in podatkovni znanstvenik, delam na analizi podatkov Flare in raziskovanju kriptovalut. Že več kot dve leti.', fullCv: 'Življenjepis', openPdf: 'Odpri PDF ↗', emailMe: 'Piši mi', openCvPdf: 'Odpri PDF življenjepisa',
    footerEmail: 'e-pošta', footerGithub: 'github',
  },
}

const postTranslations = {
  sl: {
    'spotify-recommendations': { title: 'Algoritmi za priporočanje skladb Spotify', description: 'Raziskava različnih pristopov k izdelavi sistema za priporočanje skladb s podatki Spotify in primerjava rezultatov.' },
    'toxicity-attention-gnn': { title: 'Napovedovanje toksičnosti z modeli Attention-GNN', description: 'Uporaba grafovskih nevronskih mrež in diferenciranega združevanja za analizo toksičnosti spojin.' },
    'environment-disease': { title: 'Odprti podatki in razvoj bolezni', description: 'Raziskava, ali lahko odprti podatki razkrijejo vpliv okolja na razvoj bolezni.' },
    'traveling-salesperson': { title: 'Problem trgovskega potnika', description: 'Praktični pristopi k približnim rešitvam klasičnega problema trgovskega potnika.' },
    'dungeon-blueprint': { title: 'Dungeon BluePrint', description: 'Orodje, ki olajša izdelavo in uporabo zemljevidov za D&D.' },
    'connecting-famous-actors': { title: 'Povezovanje slavnih igralcev', description: 'Grafovski eksperiment o povezanosti hollywoodskih igralcev prek skupnih filmov.' },
    'remaking-wolfenstein': { title: 'Ponovna izdelava Castle Wolfenstein', description: 'Ponovna izdelava preprostega, a zanimivega grafičnega pogona iz izvirnega Wolfensteina.' },
    'drugamatching': { title: 'Zmenki — DrugaMatching', description: 'Spletna stran za zmenke, izdelana s Firebase za povezovanje dijakov.' },
  },
}

const LanguageContext = createContext(null)

const getInitialLanguage = () => {
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'en' || stored === 'sl') return stored
  } catch {
    // storage unavailable: fall through to browser language
  }
  return navigator.language?.startsWith('sl') ? 'sl' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      localStorage.setItem('lang', language)
    } catch {
      // storage unavailable: language just won't persist
    }
  }, [language])

  const value = useMemo(
    () => ({ language, setLanguage, t: (key) => translations[language][key] ?? translations.en[key] ?? key }),
    [language],
  )
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

export const localizePost = (post, language) => ({ ...post, ...(postTranslations[language]?.[post.slug] ?? {}) })
