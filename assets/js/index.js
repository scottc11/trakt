import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Track from './components/trackDetail';
import TrackList from './components/trackList';

const audioCtx = new (window.AudioContext || window.webkitAudioContext);
const url = 'https://storage.googleapis.com/trakt/media%2Ftracks%2Fjolly-good%2FBirth_of_Wasps_07-26-17.mp3'
let audioBuffer;
let request = new XMLHttpRequest();
request.open("GET", url, true);
// Obtain as buffer array
request.responseType = "arraybuffer";

// Send request and save it
request.onload = function() {
    audioCtx.decodeAudioData(
        request.response,
        function(buffer) {
            audioBuffer = buffer;
        }
    );
};

request.send();

// Play sound
function play() {
    // Create AudioBufferSource and attach buffer
    var source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);

    // Play the source
    source.start(0);
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [] };

    this.apiQuery();
  }

  apiQuery() {
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: window.location.href.replace('home/', 'api/tracks/'),
    }).done( data => {
      console.log(data);
      this.setState({ tracks: data });
    });
  }

  render() {
    return (
        <div>
          <TrackList tracks={this.state.tracks} />
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
