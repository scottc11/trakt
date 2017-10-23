import React, { Component } from 'react';
import MediaButtons from './trackMediaButtons';

class Track extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.track);
    this.state = {
      button: '',
      audioElement: null,
      audioSource: null,
      gainNode: null
    };
    this.audioElement = null;
  }

  componentDidMount() {
    this.createAudioSource(this.props.track.audio_file);
  }

  createAudioSource(url) {
    let element = new Audio(url);
    element.crossOrigin = "anonymous";
    element.controls = false;
    element.loop = false;
    element.autoplay = false;
    this.audioElement = element;
  }

  connectAudioSource(element) {
    let source = this.props.audioCtx.createMediaElementSource(element);
    let gainNode = this.props.audioCtx.createGain();
    source.connect(gainNode);
    gainNode.connect(this.props.audioCtx.destination);
    this.setState({
      audioSource: source,
      gainNode: gainNode
    });
  }

  onPlay() {
    this.setState({ button: 'PLAY' });
    this.audioElement.play();
  }

  onPause() {
    this.setState({ button: 'PAUSE' });
    this.audioElement.pause();
  }

  onStop() {
    this.setState({ button: 'STOP' });
  }

  render() {
    // if track is null/ajax still loading
    if (!this.props.track) { return (<div>loading....</div>) }

    return (
      <li>
        <div className="audio-player">
          <h6>Title: {this.props.track.title}</h6>
          <span onClick={ this.onPlay.bind(this) } className="fa fa-play"></span>
          <span onClick={ this.onPause.bind(this) } className="fa fa-pause"></span>
          <span onClick={ this.onStop.bind(this) } className="fa fa-stop"></span>
          <h6>status: { this.state.button }</h6>
        </div>
      </li>
    )
  }
};

export default Track;
