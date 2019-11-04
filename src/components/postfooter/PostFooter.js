import React from 'react';
import { Link } from 'gatsby';
import './PostFooter.scss';

class PostFooter extends React.Component{
  render(){
    return(
      <footer className="post-content-footer">
        { this.props.link ?
          <a href={this.props.link} className="post-external-link-footer" target="_new">View the live version of {this.props.title} <span class="right-arrow">&raquo;</span></a>
          : null
        }
        <hr/>
        <ul>
          {this.props.previous && (
            <li className="previous-post">
              <Link to={this.props.previous.fields.slug} rel="prev">
                ← {this.props.previous.frontmatter.title}
              </Link>
            </li>
          )}
          {this.props.next && (
            <li className="next-post">
              <Link to={this.props.next.fields.slug} rel="next">
                {this.props.next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </footer>
    );
  }
}

export default PostFooter;
