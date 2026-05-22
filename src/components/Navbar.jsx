import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: '~/init' },
  { path: '/about', label: '~/about' },
  { path: '/credentials', label: '~/credentials' },
  { path: '/deployments', label: '~/deployments' },
  { path: '/network', label: '~/network' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" id="nav-brand">
          <span className="prompt-symbol">&gt;_</span>
          <span>krishbansal.dev</span>
        </NavLink>

        <div className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              id={`nav-link-${item.label.replace('~/', '')}`}
            >
              <span className="bracket">[</span>
              <span>{item.label}</span>
              <span className="bracket">]</span>
            </NavLink>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
        >
          {mobileOpen ? '[✕]' : '[≡]'}
        </button>
      </div>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <span className="bracket">[</span>
            <span>{item.label}</span>
            <span className="bracket">]</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
