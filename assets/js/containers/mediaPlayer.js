import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import convertRange from '../utils/convertRange';
import { PlayAudioFile, PauseAudioFile } from '../actions/mediaPlayerActions';

class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      currentTimeString: '00:00',
      duration: 100,
      durationString: '00:00'
    }
    this.audioElement = null;
    this.playAudioSource = this.playAudioSource.bind(this);
    this.pauseAudioSource = this.pauseAudioSource.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.loadMetaData = this.loadMetaData.bind(this);
    this.onScrub = this.onScrub.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    // new file
    if (prevProps.activeTrack.url !== this.props.activeTrack.url ) {
      if (this.props.activeTrack.isPlaying) {
        this.createAudioSource(this.props.activeTrack.url);
        this.playAudioSource();
      } else {
        this.pauseAudioSource();
      }
    // same file
    } else {
      if (prevProps.activeTrack.isPlaying !== this.props.activeTrack.isPlaying) {
        if (this.props.activeTrack.isPlaying) {
          this.playAudioSource();
        } else {
          this.pauseAudioSource();
        }
      }
    }

  }

  createAudioSource(url) {
    const element = new Audio(url);
    element.crossOrigin = "anonymous";
    element.controls = false;
    element.loop = false;
    element.autoplay = false;
    element.ontimeupdate = () => this.updateTime();
    element.addEventListener('loadedmetadata', () => this.loadMetaData(element.duration))
    this.audioElement = element;
  }

  playAudioSource() {
    this.audioElement.play();
  }

  pauseAudioSource() {
    //TODO: add redux action here to toggle ALL project track media buttons OFF
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

    const file = this.props.activeTrack.url;
    const isPlaying = this.props.activeTrack.isPlaying;

    let button = null;
    if (isPlaying) {
      button = <span onClick={ () => this.props.PauseAudioFile(file) } className="media-player__btn fa fa-pause"></span>
    } else {
      button = <span onClick={ () => this.props.PlayAudioFile(file) } className="media-player__btn fa fa-play"></span>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ PlayAudioFile, PauseAudioFile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
