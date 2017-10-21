import React, { Component } from 'react';

class Track extends Component {

  constructor(props) {
    super(props);
    this.state = { button: '' };
  }

  onPlay(event) {
    this.setState({ button: 'PLAY' });
  }

  onPause(event) {
    this.setState({ button: 'PAUSE' });
  }

  onStop(event) {
    this.setState({ button: 'STOP' });
  }

  render() {
    return (
      <div className="audio-player">
        <span onClick={ this.onPlay.bind(this) } className="fa fa-play"></span>
        <span onClick={ this.onPause.bind(this) } className="fa fa-pause"></span>
        <span onClick={ this.onStop.bind(this) } className="fa fa-stop"></span>
        <h6>{ this.state.button }</h6>
      </div>
    )
  }
};

export default Track;
