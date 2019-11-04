import React from 'react';
import './PostHeader.scss';

class PostHeader extends React.Component{
  render(){
    return(
      <header className="post-content-header">
        { this.props.link ?
          <a href={this.props.link} className="post-external-link" target="_new">View the live version of {this.props.title} <span class="right-arrow">&raquo;</span></a>
          : null
        }
        <h1>{this.props.title}</h1>
        <p className="meta">{this.props.date}</p>
      </header>
    );
  }
}

export default PostHeader;
