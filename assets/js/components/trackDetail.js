import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMediaPlayer } from '../actions/actions';
import TrackBadges from './trackBadges';
import TrackDetailFileList from './trackDetailFileList';
import TrackSessionList from './trackDetailSessionList';
import UserBadge from './userBadge';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      detailsActive: false,
      activeFile: this.props.track.audio_files[0]
    };
    this.onToggleDetails = this.onToggleDetails.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.activeFile.id !== this.state.activeFile.id) {
      this.onPause();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ activeFile: this.props.track.audio_files[0] })
  }

  onToggleDetails() {
    this.setState({
      detailsActive: !this.state.detailsActive
    })
  }

  onFileSelect(file) {
    this.setState({ activeFile: file});
  }

  onPlay() {
    this.setState({ active: true });
    this.props.updateMediaPlayer(this.state.activeFile.file, true);
  }

  onPause() {
    this.setState({ active: false });
    this.props.updateMediaPlayer(this.state.activeFile.file, false);
  }

  render() {
    let activeFile = null;
    if (this.props.track.audio_files.length < 1) {
      activeFile = <span>no file.</span>;
    } else {
      activeFile = <span className="track__info--active-file">{ this.state.activeFile.title }</span>;
    }

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
              <span className="track__info--title">{ this.props.track.title }</span>
              {activeFile}
              <UserBadge user={this.props.track.submitter} />
              <span className="track__info--date">{ this.props.track.date_recorded }</span>
              <TrackBadges genre={this.props.track.genre} bpm={this.props.track.bpm} _key={this.props.track.key} />
            </div>
            <span
              className={ this.state.detailsActive ? 'track__details--toggle fa fa-caret-up' : 'track__details--toggle fa fa-caret-down' }
              onClick={ () => this.onToggleDetails() } >
            </span>

          </div>


          { this.state.detailsActive == true &&
            <div className="track__details">
              <TrackDetailFileList onClick={ this.onFileSelect.bind(this) } files={this.props.track.audio_files} active={this.state.activeFile.id} />
              <TrackSessionList sessions={this.props.track.sessions} />
              <div className="track__details--options">
                <a title="upload audio file" href={ `${window.location.href}track/upload/${this.props.track.id}` } ><span className="fa fa-plus"></span></a>
                <a title="upload session folder" href={ `${window.location.href}track/upload/session/${this.props.track.id}` } ><span className="fa fa-cloud-upload"></span></a>
                <a title="edit track" href={ `${window.location.href}track/edit/${this.props.track.id}` } ><span className="fa fa-pencil-square-o"></span></a>
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
