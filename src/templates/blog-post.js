import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout/Layout'
import SEO from '../components/seo'
import PostHeader from '../components/postheader/PostHeader'
import PostFooter from '../components/postfooter/PostFooter'
import '../components/blog-post.scss'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.teaser}
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
        <PostHeader
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          link={post.frontmatter.externalLink}
        />
        <main className="post-content-container">
          <MDXRenderer>{post.body}</MDXRenderer>
        </main>
        <PostFooter
          title={post.frontmatter.title}
          link={post.frontmatter.externalLink}
          previous={previous}
          next={next}
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        externalLink
        teaser
      }
      body
    }
  }
`
