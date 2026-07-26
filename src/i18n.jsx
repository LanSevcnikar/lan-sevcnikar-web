import { createContext, useContext, useMemo, useState } from 'react'

const translations = {
  en: {
    about: 'About', blog: 'Blog', portfolio: 'Portfolio',
    navLabel: 'Primary navigation', languageLabel: 'Language', switchToSlovenian: 'Preklopi v slovenščino', switchToEnglish: 'Switch to English',
    heroEyebrow: 'Computer science · Ljubljana', heroIntro: 'I make computers do stuff — mostly machine learning, data, and the occasional graphics engine.',
    readBlog: 'Read the blog', viewPortfolio: 'View portfolio & CV', scroll: 'scroll',
    aboutHeading: 'Computer scientist, data scientist, and lifelong tinkerer.', aboutP1: 'I’m from Maribor, Slovenia, and I hold a bachelor’s degree in Computer Science and Mathematics from the University of Ljubljana.', aboutP2: 'I’m now continuing with the joint master’s programme in Computer Science and Mathematics, run by the Faculty of Mathematics and Physics and the Faculty of Computer and Information Science.', aboutP3: 'For more than two years I’ve worked as a computer scientist and data scientist at Abelium, contributing to Flare data analysis, crypto research, and related data products.', aboutP4: 'This site started years ago, back when I was more interested in web design. Today it is a portfolio and blog for the machine-learning, data-science, and creative-coding work I keep building.',
    factSlovenia: 'Slovenia', factMachineLearning: 'Machine learning', factDataScience: 'Data science', factExperience: '2+ years at Abelium',
    selectedWork: 'Selected work', recentProjects: 'Recent projects', allPosts: 'All posts →',
    writingProjects: 'Writing & projects', thingsBuilt: 'Things I’ve built', blogIntro: 'A running log of projects from the past few years — machine learning experiments, graphics engines, and the odd weekend hack.', wip: 'WIP',
    postNotFound: 'Post not found', backToBlog: 'Back to blog', readExternalPost: 'Read the original Medium post',
    portfolioHeading: 'What I bring to the table', currentEducation: 'Current education', currentPosition: 'Current position', education: 'Education', university: 'University of Ljubljana', educationBody: 'I have completed my Bachelor of Computer Science and Mathematics, a joint programme of the Faculty of Computer and Information Science and the Faculty of Mathematics and Physics. I am now finishing my Master of Computer Science and Mathematics in the same joint programme.', positionBody: 'My current position is at Abelium, where I have worked for more than two years as a computer scientist and data scientist on Flare data analysis, crypto research, and related data-driven tooling.', cv: 'Curriculum vitae', fullCv: 'The full CV', openPdf: 'Open PDF ↗', emailMe: 'Email me', openCvPdf: 'Open CV PDF',
    footerEmail: 'email', footerGithub: 'github',
  },
  sl: {
    about: 'O meni', blog: 'Blog', portfolio: 'Portfelj',
    navLabel: 'Glavna navigacija', languageLabel: 'Jezik', switchToSlovenian: 'Preklopi v slovenščino', switchToEnglish: 'Preklopi v angleščino',
    heroEyebrow: 'Računalništvo · Ljubljana', heroIntro: 'Računalnikom naročam, kaj naj počnejo — predvsem strojno učenje, podatke in občasni grafični pogon.',
    readBlog: 'Preberi blog', viewPortfolio: 'Oglej si portfelj in življenjepis', scroll: 'pomik',
    aboutHeading: 'Računalničar, podatkovni znanstvenik in večni ustvarjalec.', aboutP1: 'Prihajam iz Maribora in imam zaključeno diplomo iz računalništva in matematike na Univerzi v Ljubljani.', aboutP2: 'Trenutno nadaljujem na skupnem magistrskem programu Računalništvo in matematika, ki ga izvajata Fakulteta za matematiko in fiziko ter Fakulteta za računalništvo in informatiko.', aboutP3: 'Več kot dve leti delam kot računalničar in podatkovni znanstvenik v podjetju Abelium, kjer se ukvarjam z analizo podatkov Flare, kriptoznanostjo in sorodnimi podatkovnimi produkti.', aboutP4: 'Spletna stran je nastala pred leti, ko me je bolj zanimalo spletno oblikovanje. Danes je portfelj in blog za projekte s področij strojnega učenja, podatkovne znanosti in kreativnega programiranja.',
    factSlovenia: 'Slovenija', factMachineLearning: 'Strojno učenje', factDataScience: 'Podatkovna znanost', factExperience: '2+ leti v Abeliumu',
    selectedWork: 'Izbrani projekti', recentProjects: 'Novejši projekti', allPosts: 'Vsi zapisi →',
    writingProjects: 'Zapisi in projekti', thingsBuilt: 'Kar sem zgradil', blogIntro: 'Zbirka projektov zadnjih let — poskusi strojnega učenja, grafični pogoni in kakšen vikend projekt.', wip: 'V DELU',
    postNotFound: 'Zapisa ni mogoče najti', backToBlog: 'Nazaj na blog', readExternalPost: 'Preberi izvirni zapis na Mediumu',
    portfolioHeading: 'Kaj prinašam', currentEducation: 'Trenutno izobraževanje', currentPosition: 'Trenutno delovno mesto', education: 'Izobrazba', university: 'Univerza v Ljubljani', educationBody: 'Zaključil sem diplomo iz računalništva in matematike, skupni program Fakultete za računalništvo in informatiko ter Fakultete za matematiko in fiziko. Zdaj zaključujem magistrski študij računalništva in matematike na istem skupnem programu.', positionBody: 'Trenutno delam v podjetju Abelium, kjer sem že več kot dve leti računalničar in podatkovni znanstvenik. Ukvarjam se z analizo podatkov Flare, kriptoznanostjo in sorodnimi podatkovnimi orodji.', cv: 'Življenjepis', fullCv: 'Celoten življenjepis', openPdf: 'Odpri PDF ↗', emailMe: 'Piši mi', openCvPdf: 'Odpri PDF življenjepisa',
    footerEmail: 'e-pošta', footerGithub: 'github',
  },
}

const postTranslations = {
  sl: {
    'spotify-recommendations': { title: 'Algoritmi za priporočanje skladb Spotify', description: 'Raziskava različnih pristopov k izdelavi sistema za priporočanje skladb s podatki Spotify in primerjava rezultatov.' },
    'toxicity-attention-gnn': { title: 'Napovedovanje toksičnosti z modeli Attention-GNN', description: 'Uporaba grafov nevronskih mrež in diferenciranega združevanja za analizo toksičnosti spojin.' },
    'environment-disease': { title: 'Odprti podatki in razvoj bolezni', description: 'Raziskava, ali lahko odprti podatki razkrijejo vpliv okolja na razvoj bolezni.' },
    'traveling-salesperson': { title: 'Problem trgovskega potnika', description: 'Praktični pristopi k približnim rešitvam klasičnega problema trgovskega potnika.' },
    'dungeon-blueprint': { title: 'Dungeon BluePrint', description: 'Orodje za izdelavo zemljevidov, namenjeno lažjemu ustvarjanju in uporabi zemljevidov za D&D.' },
    'connecting-famous-actors': { title: 'Povezovanje slavnih igralcev', description: 'Grafovski eksperiment o povezanosti hollywoodskih igralcev prek skupnih filmov.' },
    'remaking-wolfenstein': { title: 'Ponovna izdelava Castle Wolfenstein', description: 'Ponovna izdelava preprostega, a zanimivega grafičnega pogona iz izvirnega Wolfensteina.' },
    'drugamatching': { title: 'Zmenki — DrugaMatching', description: 'Spletna stran za zmenke, izdelana s Firebase za povezovanje dijakov.' },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const value = useMemo(() => ({ language, setLanguage, t: (key) => translations[language][key] ?? translations.en[key] ?? key }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

export const localizePost = (post, language) => ({ ...post, ...(postTranslations[language]?.[post.slug] ?? {}) })
