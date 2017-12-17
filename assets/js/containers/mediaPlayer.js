import React, { Component } from 'react';
import { connect } from 'react-redux';
import convertRange from '../utils/convertRange';


class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      currentTime: 0,
      currentTimeString: '00:00',
      duration: 100,
      durationString: '00:00'
    }
    this.audioElement = null;
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.loadMetaData = this.loadMetaData.bind(this);
    this.onScrub = this.onScrub.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.activeTrack !== nextProps.activeTrack) {
      if (this.props.activeTrack.url !== nextProps.activeTrack.url) {
        if (nextProps.activeTrack.active) {
          if (this.props.activeTrack.active) { this.onPause() }
          this.createAudioSource(nextProps.activeTrack.url);
          this.onPlay();
        }
      } else {
        nextProps.activeTrack.active ? this.onPlay() : this.onPause();
      }
    }
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
    this.setState({ active: true })
  }

  onPause() {
    //TODO: add redux action here to toggle ALL project track media buttons OFF
    this.audioElement.pause();
    this.setState({ active: false })
  }

  updateTime() {
    var time = new Date(null);
    time.setSeconds(this.audioElement.currentTime);
    this.setState({
      currentTime: this.audioElement.currentTime,
      currentTimeString: time.toISOString().substr(14, 5)
    })
  }

  onScrub(e) {
    let progressBar = document.getElementById('progress-bar')
    let offset = progressBar.getBoundingClientRect();
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;
    let max = this.state.duration;
    let value = x * max / offset.width;
    this.audioElement.currentTime = this.state.duration / max * value;
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

    let button = null;
    if (this.state.active) {
      button = <span onClick={ () => this.onPause() } className="media-player__btn media-player__btn--pause fa fa-pause"></span>
    } else {
      button = <span onClick={ () => this.onPlay() } className="media-player__btn media-player__btn--play fa fa-play"></span>
    }

    return (
      <div className="media-player">
        { button }
        <span className="media-player__time">{this.state.currentTimeString}</span>
        <progress id='progress-bar' onClick={ (event) => this.onScrub(event) } max={this.state.duration} value={this.state.currentTime} ></progress>
        <span className="media-player__time">{this.state.durationString}</span>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { activeTrack: state.activeTrack };
}


export default connect(mapStateToProps)(MediaPlayer);
