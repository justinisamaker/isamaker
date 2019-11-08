import React from 'react'
import { graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Image from 'gatsby-image'

import Layout from '../components/layout/Layout'
import SEO from '../components/seo'
import HomeIntro from '../components/homeintro/HomeIntro'
import '../components/home.scss'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Justin is a Maker"
          keywords={[
            'creative technologist',
            'Chicago',
            'New Orleans',
            'react',
            'front-end',
            'front end',
            'javascript',
            'raspberry pi',
            'arduino',
          ]}
        />

        <HomeIntro />

        <div className="home-posts">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            let image = node.frontmatter.featuredImage.childImageSharp.fluid
            return (
              <AniLink
                cover
                bg="url(/stardust2.png) repeat"
                direction="left"
                key={node.fields.slug}
                to={node.fields.slug}
                className="project"
              >
                <div className="project-title">
                  <h2>{title}</h2>
                </div>

                <div className="project-info">
                  <h3>{title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.teaser,
                    }}
                  />
                </div>

                <div className="project-overlay"></div>

                <Image
                  fluid={image}
                  alt={title}
                  className="project-image"
                />
              </AniLink>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            teaser
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
