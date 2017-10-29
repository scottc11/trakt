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
        if (track.status == 1) {
          d.ideas.push(track);
        } else if (track.status == 2) {
          d.inTheWorks.push(track);
        } else if (track.status == 3) {
          d.finalizing.push(track);
        } else if (track.status == 4) {
          d.finished.push(track);
        }
      });
      this.setState({ tracks: d });
    });
  }

  render() {
    //TODO: potentially call a 'organize tracks' method here, so that when state is changed
    // (ie. user changes track status) then you can update the arrays based on new states

    return (
      <div>
        <TrackList tracks={this.state.tracks.ideas} status="Ideas" />
        <TrackList tracks={this.state.tracks.inTheWorks} status="In the Works" />
        <TrackList tracks={this.state.tracks.finalizing} status="Mixing" />
        <TrackList tracks={this.state.tracks.finished} status="Finished" />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
