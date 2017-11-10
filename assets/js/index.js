import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import rootReducer from './reducers/reducers';
import Header from './containers/header';
import Project from './containers/project';
import MediaPlayer from './containers/mediaPlayer'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { id: '', username: '' },
      projects: [],
      currentProject: {}
    };

    // this.apiQuery();
  }

  apiQuery() {
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: window.location.href + 'api/users/current/'
    }).done( data => {
      this.setState(
        {
          user: {id: data.id, username: data.username },
          projects: data.projects,
          currentProject: data.projects[0]
        }
      );
    });
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
