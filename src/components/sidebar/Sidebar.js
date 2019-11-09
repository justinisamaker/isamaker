import AniLink from 'gatsby-plugin-transition-link/AniLink'
import React from 'react'
import './Sidebar.scss'
import Logo from '../../svgs/jts-logo.svg'

const Sidebar = () => {
  return (
    <aside className="main-sidebar">
      <AniLink
        cover
        bg="url(/stardust2.png) repeat"
        direction="right"
        className="logo-link"
        to={'/'}
      >
        <Logo className="jts-logo" />
        <h1 className="header-title">
          Justin
          <br />
          Smith
        </h1>
      </AniLink>

      <section className="sidebar-info">
        <div className="specialities">
          <h2>Nascent Technology</h2>
          <h2>Web Development</h2>
          <h2>Open Hardware</h2>
        </div>

        <div className="social">
          <a href="https://www.linkedin.com/in/justinisamaker/" target="_new">
            LinkedIn
          </a>
          <a href="https://github.com/justinisamaker" target="_new">
            GitHub
          </a>
          <a href="http://instagram.com/justinisamaker" target="_new">
            Instagram
          </a>
        </div>
      </section>
    </aside>
  )
}

export default Sidebar
