
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import PrototypeMethods from './utils/prototypeMethods.js';
import Styles from '../less/index.less';
import rootReducer from './reducers/reducers';
import AppContainer from './containers/appContainer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

// set scrf token from django cookie
const csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
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
