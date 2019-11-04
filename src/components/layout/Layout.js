import React from 'react';
import { Link } from 'gatsby';
import Sidebar from '../sidebar/Sidebar';

import '../main.scss';
import './Layout.scss';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    let contentContainer = (location.pathname === rootPath ? "home-content" : "post-content")

    return (
      <div className="container">
        <Sidebar siteTitle={title} />
        <div className={contentContainer}>
          {/* {header} */}
          {children}
        </div>
      </div>
    )
  }
}

export default Layout
