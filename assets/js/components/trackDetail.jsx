import React, { Component } from 'react';
import TrackDetailFileList from './trackDetailFileList';
import TrackSessionList from './trackDetailSessionList';

class TrackDetail extends Component {
  render() {
    const track = this.props.track;

    return (
      <div className="track__details">
        <TrackDetailFileList onSelect={ () => console.log('play something') } track={track} active={1} />
        <TrackSessionList sessions={track.sessions} />
      </div>
    )
  }
};

export default TrackDetail;
