import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMediaPlayer } from '../actions/actions';
import TrackInfo from './trackDetailInfo';
import TrackDetailFileList from './trackDetailFileList';
import TrackSessionList from './trackDetailSessionList';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      detailsActive: false,
      activeFile: props.track.audio_files[0]
    };
    this.onToggleDetails = this.onToggleDetails.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.activeFile.id !== this.state.activeFile.id) {
      this.onPause();
    }
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
              <h6 className="">{ this.state.activeFile.title }</h6>
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
              <TrackDetailFileList onClick={ this.onFileSelect.bind(this) } files={this.props.track.audio_files} active={this.state.activeFile.id} />
              <TrackSessionList sessions={this.props.track.sessions} />
              <TrackInfo genre={this.props.track.genre} bpm={this.props.track.bpm} _key={this.props.track.key} />
              <div className="track__details--options">
                <a href={ `${window.location.href}track/upload/${this.props.track.id}` } ><span className="fa fa-plus"></span></a>
                <a href={ `${window.location.href}track/edit/${this.props.track.id}` } ><span className="fa fa-pencil-square-o"></span></a>
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
