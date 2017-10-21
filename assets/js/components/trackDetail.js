import React, { Component } from 'react';
import MediaButtons from './trackMediaButtons';

class Track extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.track);
    this.state = { button: '' };
  }

  onPlay() {
    this.setState({ button: 'PLAY' });
  }

  onPause() {
    this.setState({ button: 'PAUSE' });
  }

  onStop() {
    this.setState({ button: 'STOP' });
  }

  render() {
    // if track is null/ajax still loading
    const self = this;
    if (!this.props.track) { return (<div>loading....</div>) }

    return (
      <li>
        <div className="audio-player">
          <h6>Title: {this.props.track.title}</h6>
          <MediaButtons
            onPlay={ this.onPlay.bind(this) }
            onPause={ this.onPause.bind(this) }
            onStop={ this.onStop.bind(this) }
            track={this.props.track}
            />

          <h6>status: { this.state.button }</h6>
        </div>
      </li>
    )
  }
};

export default Track;
