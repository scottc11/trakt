import React, { Component } from 'react';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
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

  onPlay() {
    this.setState({ active: true });
    this.audioElement.play();
  }

  onPause() {
    this.setState({ active: false });
    this.audioElement.pause();
  }

  render() {

    let button = null;
    if (this.state.active) {
      button = <span className="track--button fa fa-pause" onClick={ this.onPause.bind(this) }></span>;
    } else {
      button = <span className="track--button fa fa-play" onClick={ this.onPlay.bind(this) }></span>;
    }


    return (
      <li>
        <div className="track">
          <div className="track__player">
            { button }
            <div className="track__info">
              <h6 className="track--title">"{ this.props.track.title }"</h6>
              <h6 className="track--submitter">{ this.props.track.submitter }</h6>
              <h6 className="track--date">{ this.props.track.date_recorded }</h6>
            </div>
          </div>
          <div className="track--badges">
            <span className="badge badge--genre">{ this.props.track.genre }</span>
            <span className="badge badge--key">{ this.props.track.key }</span>
            <span className="badge badge--bpm">{ this.props.track.bpm }</span>
          </div>
        </div>
      </li>
    )
  }
};

export default TrackDetail;
