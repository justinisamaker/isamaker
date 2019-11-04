import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import '../components/blog-post.scss';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    console.log(this.props.pageContext)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <header className="post-content-header">
          { post.frontmatter.externalLink ?
              <a href={post.frontmatter.externalLink} className="post-external-link" target="_new">View the live version of {post.frontmatter.title} <span class="right-arrow">&raquo;</span></a>
            : null
          }
          <h1>{post.frontmatter.title}</h1>
          <p className="meta">{post.frontmatter.date}</p>
        </header>
        <main className="post-content-container">
          <MDXRenderer>{post.body}</MDXRenderer>
          <hr />
          <Bio />

          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </main>
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
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        externalLink
      }
      body
    }
  }
`
