import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import rootReducer from './reducers/reducers';
import ProjectList from './containers/projectList';
import ProjectDetail from './containers/projectDetail';
import Header from './components/header';
import Project from './containers/project';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { id: '', username: '' },
      projects: [],
      currentProject: {},
      tracks: {
        snippets: [],
        ideas: [],
        mixing: [],
        finished: [],
      },

    };

    this.apiQuery();
  }

  apiQuery() {
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: window.location.href + 'api/users/current/'
    }).done( data => {
      console.log(data);
      let d = { snippets: [], ideas: [], mixing: [], finished: [] };
      data.projects[0].tracks.map( (track) => {
        if (track.status == 1) {
          d.snippets.push(track);
        } else if (track.status == 2) {
          d.ideas.push(track);
        } else if (track.status == 3) {
          d.mixing.push(track);
        } else if (track.status == 4) {
          d.finished.push(track);
        }
      });
      this.setState(
        {
          user: {id: data.id, username: data.username },
          projects: data.projects,
          currentProject: data.projects[0],
          tracks: d
        }
      );
    });
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <div>
          <div>
            <Header
              user={ this.state.user }
              projects={ this.state.projects }
              currentProject={ this.state.currentProject }
            />
          </div>
          <div>
            <Project />
          </div>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));

// <TrackList tracks={this.state.tracks.snippets} status="Snippets" />
// <TrackList tracks={this.state.tracks.ideas} status="Ideas" />
// <TrackList tracks={this.state.tracks.mixing} status="Mixing" />
// <TrackList tracks={this.state.tracks.finished} status="Finished" />
