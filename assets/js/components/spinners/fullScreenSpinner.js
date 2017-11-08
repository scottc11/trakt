import React, { Component } from 'react';

const FullScreenSpinner = (props) => {

  return (
    <div className="spinner--full-screen">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  );
}

export default FullScreenSpinner;
