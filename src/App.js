import 'normalize.css';
import './global.scss';

import {hot} from 'react-hot-loader/root';
import React from 'react';
import Tooltip from './components/Tooltip';

import {Positions} from './components/Tooltip/constants';

function App() {
  return (
    <div className="container">
      <h1>Kitchen Sink</h1>
      <div className="stage">
        <div className="cell left">
          <Tooltip position={Positions.BOTTOM}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell center">
          <Tooltip position={Positions.BOTTOM}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell right">
          <Tooltip position={Positions.BOTTOM}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell left middle">
          <Tooltip position={Positions.TOP}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell center middle">
          <Tooltip position={Positions.TOP}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell right middle">
          <Tooltip position={Positions.TOP}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell left">
          <Tooltip position={Positions.TOP}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell center">
          <Tooltip position={Positions.TOP}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>

        <div className="cell right">
          <Tooltip position={Positions.TOP}>
            <a href="#">Open tooltip</a>
          </Tooltip>
        </div>
      </div>

      <div
        style={{
          marginTop: '4rem',
        }}
      >
        <Tooltip title="Image tooltip 🐶" position={Positions.TOP}>
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Small black dog looking up"
            className="image-test"
          />
        </Tooltip>
        <Tooltip title="Image tooltip 📷" position={Positions.BOTTOM}>
          <img src="https://picsum.photos/200/300" alt="Random Image" className="image-test" />
        </Tooltip>
      </div>
    </div>
  );
}

export default hot(App);
