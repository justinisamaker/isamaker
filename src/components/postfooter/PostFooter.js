import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import './PostFooter.scss'

class PostFooter extends React.Component {
  render() {
    return (
      <footer className="post-content-footer">
        {this.props.link ? (
          <a
            href={this.props.link}
            className="post-external-link-footer"
            target="_new"
          >
            View the live version of {this.props.title}{' '}
            <span class="right-arrow">&raquo;</span>
          </a>
        ) : null}
        <hr />
        <ul>
          <li className="next-post">
            {this.props.next ? (
                <AniLink
                  cover
                  bg="url(/stardust2.png) repeat"
                  direction="left"
                  to={this.props.next.fields.slug}
                  rel="prev"
                >
                  ← {this.props.next.frontmatter.title}
                </AniLink>
            ) : '' }
          </li>
          <li className="previous-post">
            {this.props.previous ? (
              <AniLink
                cover
                bg="url(/stardust2.png) repeat"
                direction="right"
                to={this.props.previous.fields.slug}
                rel="next"
              >
                {this.props.previous.frontmatter.title} →
              </AniLink>
            ) : ''}
          </li>
        </ul>
      </footer>
    )
  }
}

export default PostFooter
