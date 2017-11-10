import React, { Component } from 'react';
import convertRange from '../utils/convertRange';


class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      currentTimeString: '00:00',
      duration: 100,
      durationString: '100'

    }
    this.audioElement = null;
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.loadMetaData = this.loadMetaData.bind(this);
  }

  componentDidMount() {
    this.createAudioSource("https://storage.googleapis.com/trakt/dev%2Fusers%2Fjanky99%2Ftracks%2Fsc-fold%2F003_-_SC_fold_V2.wav");
  }

  createAudioSource(url) {
    let element = new Audio(url);
    element.crossOrigin = "anonymous";
    element.controls = false;
    element.loop = false;
    element.autoplay = false;
    element.ontimeupdate = () => this.updateTime();
    element.addEventListener('loadedmetadata', () => this.loadMetaData(element.duration))
    this.audioElement = element;
  }

  onPlay() {
    this.audioElement.play();
  }

  onPause() {
    this.audioElement.pause();
  }

  updateTime() {
    var time = new Date(null);
    time.setSeconds(this.audioElement.currentTime);
    this.setState({
      currentTime: this.audioElement.currentTime,
      currentTimeString: time.toISOString().substr(14, 5)
    })
  }

  loadMetaData(duration) {
    var time = new Date(null);
    time.setSeconds(duration);
    this.setState({
      duration: duration,
      durationString: time.toISOString().substr(14, 5)
    });
  }

  render() {
    return (
      <div className="media-player">
        <span onClick={ () => this.onPlay() } className="media-player__btn media-player__btn--play fa fa-play"></span>
        <span className="media-player__time">{this.state.currentTimeString}</span>
        <progress max={this.state.duration} value={this.state.currentTime} ></progress>
        <span onClick={ () => this.onPause() } className="media-player__btn media-player__btn--pause fa fa-pause"></span>
        <span className="media-player__time">{this.state.durationString}</span>
      </div>
    )
  }
}


export default MediaPlayer;
