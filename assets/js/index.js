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
      url: window.location.href + 'api/tracks/'
    }).done( data => {
      console.log(data);
      let d = { ideas: [], inTheWorks: [], finalizing: [], finished: [] };
      data.map( (track) => {
        if (track.stage == 'Idea') {
          d.ideas.push(track);
        } else if (track.stage == 'In the Works') {
          d.inTheWorks.push(track);
        } else if (track.stage == 'Finalizing / Mixing') {
          d.finalizing.push(track);
        } else if (track.stage == 'Finished') {
          d.finished.push(track);
        }
      });
      this.setState({ tracks: d });
    });
  }

  render() {
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
