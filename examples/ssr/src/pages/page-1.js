import React from "react"
import { Link } from "gatsby"
import { functionalSafeComponent } from 'react-isomorphic-error-boundary';

import Layout from "../components/layout"
import SEO from "../components/seo"

const CustomErrorComponent = () => (
  <p>
    Custom Error Component
  </p>
);

const FirstPage = () => (
  <Layout>
    {error}
    <SEO title="Page one" b={d}/>
    <h1>Hi from the first page</h1>
    <p>Welcome to page 1</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default functionalSafeComponent(FirstPage, CustomErrorComponent);
