import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeleteAudioFile, UpdateActiveFileIndex, DeleteTrack } from '../../actions/track_actions';
import TrackDetailFileList from './trackDetailFileList';
import TrackSessionList from './trackDetailSessionList';
import Button from '../Button';


class TrackDetail extends Component {
  render() {
    const track = this.props.track;

    return (
      <div className="track__details">
        <TrackDetailFileList onSelect={this.props.UpdateActiveFileIndex} onDeleteFile={this.props.DeleteAudioFile} track={track} />
        <TrackSessionList sessions={track.sessions} />
        <div style={{textAlign: 'right'}}>
          <Button action={() => this.props.DeleteTrack(track.id) } icon="fas fa-trash-alt" class="btn btn--red" label="Delete Track" />
        </div>
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ DeleteAudioFile, UpdateActiveFileIndex, DeleteTrack }, dispatch);
}

export default connect(null, mapDispatchToProps)(TrackDetail);
