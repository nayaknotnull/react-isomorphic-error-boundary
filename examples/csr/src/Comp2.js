import React from 'react'
import nonFunctionalSafeComponent from 'react-isomorphic-error-boundary';

class Comp2 extends React.Component {

  render() {
    return this.props.a.b; // So this should cause the error
  }
}
export default nonFunctionalSafeComponent(Comp2);