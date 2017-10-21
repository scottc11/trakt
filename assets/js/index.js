import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Track from './components/trackDetail';
import TrackList from './components/trackList';


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
