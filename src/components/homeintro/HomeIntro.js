import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import './HomeIntro.scss'

function HomeIntro() {
  return (
    <StaticQuery
      query={introQuery}
      render={data => {
        return (
          <section className="home-intro">
            <Image
              fluid={data.profilePic.childImageSharp.fluid}
              alt="Justin Smith"
              className="home-intro-photo"
            />
            <div className="home-intro-bio">
              <div className="intro">
                <h2>Hello, I'm Justin.</h2>
                <p>
                  I'm a maker and educator who loves to explore new technologies. My work
                  blends front-end development, fine arts, and years of
                  involvement in the maker and startup communities. I work
                  primarily with MERN stacks (Mongo, Express, React, Node), and
                  also have extensive experience with rapid prototyping projects.
                </p>

                <p>In 2020 I left a full-time role as a software engineer to pursue
                  an opportunity to run a makerspace program at a middle school. The class I teach
                  is called "Workshop," and exists somewhere between a design thinking program,
                  a shop class, and a coding bootcamp.</p>
                {/*
                <p>
                  <em>
                    I am currently looking for software engineering roles in New
                    Orleans, or roles that mesh well with working remotely.
                  </em>{' '}
                  I'm open to a purely front-end role, but my sweet spot is
                  working with a mix of hardware and software. I really enjoy
                  projects that find new ways to engage users outside of a
                  screen.
                </p>
                */}
              </div>
              <div className="contact">
                <h5>Want to know more?</h5>
                <p>
                  You can find me on{' '}
                  <a
                    href="https://www.linkedin.com/in/justinisamaker/"
                    target="_new"
                  >
                    LinkedIn
                  </a>
                  {' '}and{' '}
                  <a href="https://github.com/justinisamaker" target="_new">
                    GitHub
                  </a>
                  . You can also reach me via e-mail at{' '}
                  <a href="mailto:justin@isamaker.com">justin@isamaker.com</a>.
                </p>
              </div>
              <div className="select-clients">
                <h5>Select clients</h5>
                <p>
                  Google, Nike, Nissan, United Airlines, ComEd, A.C. Moore,
                  USAA, Prota Ventures, DeepLocal
                </p>
              </div>
            </div>
          </section>
        )
      }}
    />
  )
}

const introQuery = graphql`
  query IntroQuery {
    profilePic: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default HomeIntro
