import { Link, NavLink } from 'react-router-dom'

export default function Layout({ children }) {
  return <div className="site-shell">
    <header className="nav-wrap">
      <Link className="brand" to="/"><span />Lan Sevčnikar</Link>
      <nav aria-label="Primary navigation">
        <NavLink to="/" end>About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
      </nav>
    </header>
    <main>{children}</main>
    <footer><span>© {new Date().getFullYear()} Lan Sevčnikar</span><div><a href="mailto:sevcnikar.lan@gmail.com">email</a><a href="https://github.com/LanSevcnikar" target="_blank" rel="noreferrer">github</a></div></footer>
  </div>
}
