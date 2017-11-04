import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Track from './components/trackDetail';
import TrackList from './components/trackList';
import Header from './components/header';

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
    //TODO: potentially call a 'organize tracks' method here, so that when state is changed
    // (ie. user changes track status) then you can update the arrays based on new states

    return (
      <div>
        <div>
          <Header
            user={ this.state.user }
            projects={ this.state.projects }
            currentProject={ this.state.currentProject }
          />
        </div>
        <div>
          <TrackList tracks={this.state.tracks.snippets} status="Snippets" />
          <TrackList tracks={this.state.tracks.ideas} status="Ideas" />
          <TrackList tracks={this.state.tracks.mixing} status="Mixing" />
          <TrackList tracks={this.state.tracks.finished} status="Finished" />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
