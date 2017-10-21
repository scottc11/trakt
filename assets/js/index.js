import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Track from './components/trackDetail';

class App extends Component {
    render() {
      return (
          <div>
            <Track />
          </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
