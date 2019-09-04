import React from 'react';
import functionalSafeComponent from 'react-isomorphic-error-boundary';

function Comp1(props) {
  const c = props.c.a;
  return <h1>${c}</h1>;
}

export default functionalSafeComponent(Comp1);