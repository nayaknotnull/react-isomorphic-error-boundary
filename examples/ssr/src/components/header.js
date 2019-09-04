import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { functionalSafeComponent } from 'react-isomorphic-error-boundary';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
      marginTop: siteTitle.d.a,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

const ErrorBoundedHeader = functionalSafeComponent(Header);

ErrorBoundedHeader.propTypes = {
  siteTitle: PropTypes.string,
}

ErrorBoundedHeader.defaultProps = {
  siteTitle: ``,
}

export default ErrorBoundedHeader;
