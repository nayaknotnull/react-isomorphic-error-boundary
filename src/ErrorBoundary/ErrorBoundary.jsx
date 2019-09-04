import React from 'react';
import PropTypes from 'prop-types';
import logError from '../errorLogger';
import FallbackErrorComponent from '../ErrorFallbackComponent/ErrorFallbackComponent';
import {
  DEFAULT_CLASS_NAME,
  LIFECYCLE_METHODS,
  RENDER_METHOD_NAME,
  DEFAULT_COMPONENT_NAME,
  SHOULD_COMPONENT_UPDATE_METHOD_NAME,
} from '../config';

/**
 * Generate error component
 * @param {object} error
 * @param {string} componentName
 * @param {*} CustomErrorComponent optional
 */
export const RenderErrorComponent = ({ error, componentName, CustomErrorComponent }) => {
  return React.createElement(
    'div',
    {
      className: DEFAULT_CLASS_NAME,
    },
    (CustomErrorComponent || FallbackErrorComponent).call(this, { errorMessage: error.message, componentName })
  );
};

/**
 * Generate error safe client component
 * @param {function} renderComponent generate component render
 * @param {string} componentName
 * @param {function} loggerService custom service to log the errors
 */
export const renderClientSafeComponent = (renderComponent, componentName, loggerService) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
      this.componentName = componentName;
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      (loggerService || logError)({ error, errorInfo });
    }

    render() {
      return renderComponent(this.props, this.state);
    }
  };
};

/**
 * Generate error safe functional component
 * @param {*} WrappedComponent
 * @param {*} CustomErrorComponent optional
 * @param {function} loggerService custom service to log the errors
 */
export const functionalSafeComponent = (WrappedComponent, CustomErrorComponent, loggerService) => {
  const renderComponent = (passedProps, passedState) => {
    try {
      const { hasError, error } = passedState;
      return hasError
        ? RenderErrorComponent({ error, componentName: WrappedComponent.name, CustomErrorComponent })
        : WrappedComponent(passedProps);
    } catch (err) {
      (loggerService || logError)({ error: err, errorInfo: WrappedComponent.name });
      return RenderErrorComponent({ error: err, componentName: WrappedComponent.name, CustomErrorComponent });
    }
  };
  return renderClientSafeComponent(renderComponent, WrappedComponent.name, loggerService);
};

/**
 * Create error safe component methods
 * @param {string} methodName
 * @param {*} WrappedComponent
 * @param {*} CustomErrorComponent optional
 * @param {function} loggerService custom service to log the errors
 */
export const wrapMethod = (methodName, WrappedComponent, CustomErrorComponent, loggerService) => {
  const originalMethod = WrappedComponent.prototype[methodName];
  if (!originalMethod) {
    return;
  }

  // define default state
  WrappedComponent.prototype.state = {
    hasError: false,
    error: null,
    ...WrappedComponent.prototype.state,
  };

  WrappedComponent.prototype[methodName] = function _componentMethod() {
    try {
      if (methodName === RENDER_METHOD_NAME) {
        const { hasError, error } = this.state;
        return hasError
          ? RenderErrorComponent({ error, componentName: WrappedComponent.name, CustomErrorComponent })
          : originalMethod.apply(this, arguments);
      }
      return originalMethod.apply(this, arguments);
    } catch (err) {
      (loggerService || logError)({ error: err, errorInfo: WrappedComponent.name });
      if (methodName === RENDER_METHOD_NAME) {
        return RenderErrorComponent({ error: err, componentName: WrappedComponent.name, CustomErrorComponent });
      }
      if (methodName === SHOULD_COMPONENT_UPDATE_METHOD_NAME) {
        return false;
      }
      return false;
    }
  };
};

/**
 * Generate error safe non functional component
 * @param {*} WrappedComponent
 * @param {*} CustomErrorComponent optional
 * @param {function} loggerService custom service to log the errors
 */
export const nonFunctionalSafeComponent = (WrappedComponent, CustomErrorComponent, loggerService) => {
  LIFECYCLE_METHODS.forEach(method => wrapMethod(method, WrappedComponent, CustomErrorComponent, loggerService));
  const renderComponent = passedProps => <WrappedComponent {...passedProps} />;
  return renderClientSafeComponent(renderComponent, WrappedComponent.name, loggerService);
}

/**
 * Generate error safe component
 * @param {*} WrappedComponent
 * @param {*} CustomErrorComponent optional
 * @param {function} loggerService custom service to log the errors
 */
export const SafeComponent = (WrappedComponent, CustomErrorComponent, loggerService) => (!WrappedComponent.prototype[RENDER_METHOD_NAME]
  ? functionalSafeComponent(WrappedComponent, CustomErrorComponent, loggerService)
  : nonFunctionalSafeComponent(WrappedComponent, CustomErrorComponent, loggerService));

RenderErrorComponent.propTypes = {
  error: PropTypes.shape([]),
  componentName: PropTypes.string,
  CustomErrorComponent: PropTypes.shape({}),
};

RenderErrorComponent.defaultProps = {
  error: {},
  componentName: DEFAULT_COMPONENT_NAME,
  CustomErrorComponent: null,
};

export default SafeComponent;
