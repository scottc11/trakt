import React, { Component } from 'react';
import TrackDetails from './trackInfo';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      detailsActive: false
    };
    this.audioElement = null;
    this.onToggleDetails = this.onToggleDetails.bind(this);
  }

  componentDidMount() {
    this.createAudioSource(this.props.track.audio_file);
  }

  onToggleDetails() {
    this.setState({
      detailsActive: !this.state.detailsActive
    })
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
      button = <div className="fa fa-pause" onClick={ this.onPause.bind(this) }></div>;
    } else {
      button = <div className="fa fa-play" onClick={ this.onPlay.bind(this) }></div>;
    }

    return (
      <li>
        <div className="track">

          <div>

            <div className="track--button">
              { button }
            </div>

            <div className="track__info">
              <h6 className="track__info--title">{ this.props.track.title }</h6>
              <h6 className="track__info--submitter">{ this.props.track.submitter }</h6>
              <span className="track__info--median"> &middot; </span>
              <h6 className="track__info--date">{ this.props.track.date_recorded }</h6>
            </div>

            <span
              className={ this.state.detailsActive ? 'track__details--toggle fa fa-caret-up' : 'track__details--toggle fa fa-caret-down' }
              onClick={ () => this.onToggleDetails() } >
            </span>

          </div>


          { this.state.detailsActive == true &&
            <div className="Track__details">
              <a href={ `${window.location.href}track/edit/${this.props.track.id}` } ><span className="fa fa-pencil-square-o"></span></a>
              <TrackDetails genre={this.props.track.genre} bpm={this.props.track.bpm} _key={this.props.track.key} />
            </div>
          }

        </div>
      </li>
    )
  }
};

export default TrackDetail;
