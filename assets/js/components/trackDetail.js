import React, { Component } from 'react';
import MediaButtons from './trackMediaButtons';

class Track extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.track);
    this.state = {
      button: '',
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

  // below not yet implemented
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
    this.setState({ button: 'PLAYING' });
    this.audioElement.play();
  }

  onPause() {
    this.setState({ button: 'PAUSED' });
    this.audioElement.pause();
  }

  render() {
    // if track is null/ajax still loading
    if (!this.props.track) { return (<div>loading....</div>) }

    return (
      <li>
        <div className="track">
          <h6 className="track--title">"{ this.props.track.title }"</h6>
          <span className="track--genre">{ this.props.track.genre }</span>
          <span className="track--key">{ this.props.track.key }</span>
          <span className="track--bpm">{ this.props.track.bpm }</span>
          <div>
            <span className="track--button fa fa-play" onClick={ this.onPlay.bind(this) }></span>
            <span className="track--button fa fa-pause" onClick={ this.onPause.bind(this) }></span>
          </div>
        </div>
      </li>
    )
  }
};

export default Track;
