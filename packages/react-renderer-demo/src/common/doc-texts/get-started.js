import React, { Fragment } from 'react';
import ReactMarkdown from '../md-helper';
import RawComponent from '../component/raw-component';

const text =  `React form renderer is a component designed for ManageIQ and
Insights projects that takes json form definitions
and renders them into react components.
It uses [React final form](https://github.com/final-form/react-final-form) for the form state management.
It is highly recommended to check their documentations first to fully understand how
the [data-driven-forms](https://github.com/data-driven-forms) libraries work.`;

const GetStarted = () => (
  <Fragment>
    <ReactMarkdown source={ text } />
    <RawComponent source="get-started"/>
  </Fragment>
);

export default <GetStarted />;
