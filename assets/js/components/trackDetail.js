import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMediaPlayer } from '../actions/actions';
import TrackDetails from './trackInfo';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      detailsActive: false
    };
    this.onToggleDetails = this.onToggleDetails.bind(this);
  }

  onToggleDetails() {
    this.setState({
      detailsActive: !this.state.detailsActive
    })
  }

  onPlay() {
    this.setState({ active: true });
    this.props.updateMediaPlayer(this.props.track.audio_files[0].file, true);
  }

  onPause() {
    this.setState({ active: false });
    this.props.updateMediaPlayer(this.props.track.audio_files[0].file, false);
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
              <h6 className="">{ this.props.track.audio_files[0].title }</h6>
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
            <div className="track__details">
              <TrackDetails genre={this.props.track.genre} bpm={this.props.track.bpm} _key={this.props.track.key} />
              <div className="track__details--options">
                <a href={ `${window.location.href}track/edit/${this.props.track.id}` } ><span className="fa fa-pencil-square-o"></span></a>
                <a href={ this.props.track.audio_files[0].file } ><span className="fa fa-cloud-download"></span></a>
              </div>
            </div>
          }

        </div>
      </li>
    )
  }
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMediaPlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(TrackDetail);
