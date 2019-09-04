import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generate fallback error component
 * @param {string} errorMessage error message
 * @param {string} componentName name of the component
 */
const FallbackErrorComponent = ({ errorMessage, componentName }) => (
  <h1>
    Something went wrong in--
    <span>{componentName}</span>
    Component.
    <p>{errorMessage}</p>
  </h1>
);

FallbackErrorComponent.propTypes = {
  errorMessage: PropTypes.string,
  componentName: PropTypes.string,
};

FallbackErrorComponent.defaultProps = {
  errorMessage: '',
  componentName: '',
};

export default FallbackErrorComponent;
