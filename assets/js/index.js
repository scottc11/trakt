import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Track from './components/trackDetail';
import TrackList from './components/trackList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      audioCtx: new (window.AudioContext || window.webkitAudioContext),
      audioSource: null
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
      this.setState({ tracks: data });
    });
  }

  render() {
    return (
        <div>
          <TrackList tracks={this.state.tracks} audioCtx={this.state.audioCtx}/>
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
