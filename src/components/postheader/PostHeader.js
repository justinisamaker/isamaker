import React from 'react'
import './PostHeader.scss'

class PostHeader extends React.Component {
  render() {
    return (
      <header className="post-content-header">
        <div>
          <h1>{this.props.title}</h1>
          <p className="meta">{this.props.date}</p>
        </div>
        {this.props.link ? (
          <a
            href={this.props.link}
            className="post-external-link"
            target="_new"
          >
            View the live version <br className="external-link-break" />
            of this project <span class="right-arrow">&raquo;</span>
          </a>
        ) : null}
      </header>
    )
  }
}

export default PostHeader
