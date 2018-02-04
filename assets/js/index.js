
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import PrototypeMethods from './utils/prototypeMethods.js';
import Styles from '../less/index.less';
import rootReducer from './reducers/reducers';
import Header from './containers/header';
import Project from './containers/project';
import MediaPlayer from './containers/mediaPlayer'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

// set scrf token from django cookie
const csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
axios.defaults.baseURL = window.location.href;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { id: '', username: '' },
      projects: [],
      currentProject: {}
    };
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <div>
          <div>
            <Header />
          </div>
          <div>
            <Project />
          </div>
          <MediaPlayer />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
