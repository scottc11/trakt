
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import loggerConfig from './logger.config';

import PrototypeMethods from './utils/prototypeMethods.js';
import Styles from '../less/index.less';
import rootReducer from './reducers/reducers';
import AppContainer from './containers/appContainer';


const middleware = [ReduxPromise, ReduxThunk]

// add logger to middleware if in development environment
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  const logger = createLogger(loggerConfig);
  middleware.push(logger)
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

// set scrf token from django cookie
const csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
axios.defaults.headers.delete['X-CSRFToken'] = csrftoken;
axios.defaults.baseURL = window.location.href;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AppContainer />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
