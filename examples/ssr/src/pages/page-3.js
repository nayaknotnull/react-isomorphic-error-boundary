import React from "react"
import { Link } from "gatsby"
import { nonFunctionalSafeComponent } from 'react-isomorphic-error-boundary';

import Layout from "../components/layout"
import SEO from "../components/seo"

class CustomErrorComponent extends React.Component {
  render() {
    return (
      <p>
        Custom Error Component
      </p>
    )
  }
}

class ThirdPage extends React.Component {
  render() {
    return (
      <Layout>
        {error}
        <SEO title="Page three" b={d}/>
        <h1>Hi from the third page</h1>
        <p>Welcome to page 3</p>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default nonFunctionalSafeComponent(ThirdPage, CustomErrorComponent);
