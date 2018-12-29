import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeleteAudioFile, UpdateActiveFileIndex, DeleteTrack } from '../../actions/track_actions';
import TrackDetailFileList from './trackDetailFileList';
import TrackSessionList from './trackDetailSessionList';
import Button from '../Button';


class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteTrack: false
    }

  }


  render() {
    const track = this.props.track;

    return (
      <div className="track__details">
        <TrackDetailFileList onSelect={this.props.UpdateActiveFileIndex} onDeleteFile={this.props.DeleteAudioFile} track={track} />
        <TrackSessionList sessions={track.sessions} />
        <div style={{textAlign: 'right'}}>
          { this.state.deleteTrack == false &&
            <Button action={() => this.setState({deleteTrack: true}) } icon="fas fa-trash-alt" class="btn btn--red" label="Delete Track" />
          }
          { this.state.deleteTrack &&
            <React.Fragment>
              <span className="txt--mikado">Are you sure? This will delete all sessions and files associated with this track.</span>
              <Button action={() => this.props.DeleteTrack(track.id) } icon="fas fa-trash-alt" class="btn btn--red" label="Yes" />
              <Button action={() => this.setState({deleteTrack: false}) } class="btn btn--empty" label="cancel" />
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ DeleteAudioFile, UpdateActiveFileIndex, DeleteTrack }, dispatch);
}

export default connect(null, mapDispatchToProps)(TrackDetail);
