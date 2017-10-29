import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Track from './components/trackDetail';
import TrackList from './components/trackList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: {
        ideas: [],
        inTheWorks: [],
        finalizing: [],
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
      let d = { ideas: [], inTheWorks: [], finalizing: [], finished: [] };
      data.projects[0].tracks.map( (track) => {
        if (track.stage == 1) {
          d.ideas.push(track);
        } else if (track.stage == 2) {
          d.inTheWorks.push(track);
        } else if (track.stage == 3) {
          d.finalizing.push(track);
        } else if (track.stage == 4) {
          d.finished.push(track);
        }
      });
      this.setState({ tracks: d });
    });
  }

  render() {
    //TODO: potentially call a 'organize tracks' method here, so that when state is changed
    // (ie. user changes track status/stage) then you can update the arrays based on new states

    return (
      <div>
        <TrackList tracks={this.state.tracks.ideas} stage="Ideas" />
        <TrackList tracks={this.state.tracks.inTheWorks} stage="In the Works" />
        <TrackList tracks={this.state.tracks.finalizing} stage="Mixing" />
        <TrackList tracks={this.state.tracks.finished} stage="Finished" />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
