# React Isomorphic Error Boundary

A reusable isomorphic error boundary for React 16+

```js
import React from 'react';
import withErrorBoundary from 'react-isomorphic-error-boundary';

function SampleComponent(props) {
  const titleName = props.name;
  return <h1>${titleName}</h1>;
}

export default withErrorBoundary(SampleComponent);
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Please do download and install Node.js. Node.js 8 or higher is required.

Installation is done using the command [`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install react-isomorphic-error-boundary
```

## Features

* Universal Support - [CSR | SSR]
* Lightweight
* Customizable with fallback error components and loggers
* Valid use cases provided with examples


## Properties

<details>
   <summary>WrappedComponent : Component [Class | Function]</summary>
   *	Required
   *	Description: Pass the component to be wrapped in error boundary. This is the component which has the probability of throwing error.
</details>

<details>
   <summary>CustomErrorComponent [Class | Function]</summary>
   *	Optional
   *	Description: Although default error component does the job, option to provide a custom error component to the error-boundary HOC is also in place. This allows the developer to customize the error component at their end.
   *	Props 
   		-	errorMessage [String]: The error details for the wrapped component
		-	componentName [String]: The name of the component that has error(s)
</details>
    
<details>
   <summary>loggerService [Function]</summary>
   *	Optional
   *	Description: The HOC offers to log the error information in the console [client and server side]. There is provision that the developer can provide to get a custom logger in place. This helps in standardizing the logging of this utility and keeps it in sync with the logging patterns of the entire application.
   *	Params - error object
		- thrown error object
		- extra error information [contains component name]
</details>


## Available Scripts

We can run following scripts:

### `npm run csr`

Runs the client app in the production mode.<br>
This is the basic react app created with create-react-app script.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm run ssr`

Runs the server app in the production mode.<br>
This is the basic gatsby app created with gatsby-cli.<br>
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

These examples have error boundaries wrapped in 3 components<br>
Each wrapped component has a different variation of error boundary.

## Provided error boundaries

### Functional Component Error Boundary

Wrap the component in the error boundary HOC.<br/>

#### Example: 1 - Functional Component (Default)

Here SampleComponent will not be rendered correctly (reason mentioned inline). To prevent the complete application from going down, wrap the component in ``functionalSafeComponent``.

```js
import React from 'react';
import { functionalSafeComponent } from 'react-isomorphic-error-boundary';

function SampleComponentParent() {
  return <SampleComponent name='sample' randomProp='' />;
}

function SampleComponent(props) {
  const titleName = props.name;
  // this line will throw error as randomProp is not an object
  const randomPropValue = props.randomProp.value;
  return <h1>${titleName}</h1>;
}

export default functionalSafeComponent(SampleComponent);
```

#### Example: 2 - Functional Component with prop-types and defaultProps

In a generic scenario where we need to define ``defaultProps`` and ``PropTypes`` for a functional component. Please take a look at the example mentioned here:

```js
import React from 'react';
import { functionalSafeComponent } from 'react-isomorphic-error-boundary';
import PropTypes from 'prop-types';

function SampleComponent(props) {
  const titleName = props.name;
  return <h1>${titleName}</h1>;
}

const ErrorBoundSampleComponent = functionalSafeComponent(SampleComponent);

ErrorBoundSampleComponent.defaultProps = {
  // default props goes in here
};

ErrorBoundSampleComponent.PropTypes = {
  // PropTypes goes in here
};

export default ErrorBoundSampleComponent;
```

#### Example: 3 - Functional Component with other HOCs

In scenarios where the component needs to be wrapped in other HOCs, then wrapping the component first in the error boundary HOC followed by other HOCs will get the things done.

```js
import React from 'react';
import { functionalSafeComponent } from 'react-isomorphic-error-boundary';
import randomHOC from 'some-random-hoc';
import PropTypes from 'prop-types';

function SampleComponent(props) {
  const titleName = props.name;
  return <h1>${titleName}</h1>;
}

export default randomHOC(functionalSafeComponent(SampleComponent));
```

### Non Functional (Class Based) Error Boundary

Wrap the component in the error boundary HOC.<br/>

#### Example: 1 - Non Functional Component (Default)

Here SampleComponent will not be rendered correctly (reason mentioned inline).To prevent the complete application from going down, wrap the component in ``functionalSafeComponent``.

```js
import React from 'react';
import { nonFunctionalSafeComponent } from 'react-isomorphic-error-boundary';

class SampleComponentParent extends React.Component {
  render() {
    return <SampleComponent name='sample' randomProp='' />;
  }
}

class SampleComponent extends React.Component {
  render() {
  const titleName = this.props.name;
  // this line will throw error as randomProp is not an object
  const randomPropValue = this.props.randomProp.value;
  return <h1>${titleName}</h1>;
  }
}

export default nonFunctionalSafeComponent(SampleComponent);
```

#### Example: 2 - Non Functional Component with prop-types and defaultProps

In a generic scenario where we need to define ``defaultProps`` and ``PropTypes`` for a non-functional component. Please take a look at the example mentioned here:

```js
import React from 'react';
import { nonFunctionalSafeComponent } from 'react-isomorphic-error-boundary';
import PropTypes from 'prop-types';

class SampleComponent extends React.Component {
  render() {
    const titleName = this.props.name;
    return <h1>${titleName}</h1>;
  }
}

SampleComponent.defaultProps = {
  // default props goes in here
};

SampleComponent.PropTypes = {
  // PropTypes goes in here
};

export default nonFunctionalSafeComponent(SampleComponent);
```

#### Example: 3 - Non Functional Component with other HOCs

In cases where the component needs to be wrapped in other HOCs, then wrapping the component in error boundary at first will work.

```js
import React from 'react';
import { nonFunctionalSafeComponent } from 'react-isomorphic-error-boundary';
import randomHOC from 'some-random-hoc';

class SampleComponentParent extends React.Component {
  render() {
    return <SampleComponent name='sample' randomProp='' />;
  }
}

class SampleComponent extends React.Component {
  render() {
  const titleName = this.props.name;
  // this line will throw error as randomProp is not an object
  const randomPropValue = this.props.randomProp.value;
  return <h1>${titleName}</h1>;
  }
}

export default randomHOC(nonFunctionalSafeComponent(SampleComponent));
```

#### Example: 4 - Non Functional Component with life cycle methods

The error boundary works equally well with any of the lifecycle methods of React.

```js
import React from 'react';
import { nonFunctionalSafeComponent } from 'react-isomorphic-error-boundary';

class SampleComponent extends React.Component {

  componentDidMount() {
    // this line will throw error as randomProp is not an object
    const randomPropValue = this.props.randomProp.value;
  }

  render() {
  const titleName = this.props.name;
  return <h1>${titleName}</h1>;
  }
}

export default nonFunctionalSafeComponent(SampleComponent);
```

### Default Error Boundary

The easiest way to wrap a component in error Boundary is to import the default method from the package:

```js
import React from 'react';
import withErrorBoundary from 'react-isomorphic-error-boundary';

class SampleComponent extends React.Component {

  componentDidMount() {
    // this line will throw error as randomProp is not an object
    const randomPropValue = this.props.randomProp.value;
  }

  render() {
  const titleName = this.props.name;
  return <h1>${titleName}</h1>;
  }
}

export default withErrorBoundary(SampleComponent);
```

> The default export abstracts the functional and non functional component logic. It eases the work for the developer to use the error boundary without paying attention to the type of component. Although it is recommended to use the default export only in development phase.
