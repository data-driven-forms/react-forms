import React from 'react';
import './spinner.scss';

const Spinner = () => (
  <div className="lds-default">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const SpinnerWrapper = () => (
  <div style={{
    widht: '100%',
    padding: 30,
  }}>
    <div style={{
      margin: 'auto',
    }}>
      <Spinner />
    </div>
  </div>
);

export default SpinnerWrapper;
