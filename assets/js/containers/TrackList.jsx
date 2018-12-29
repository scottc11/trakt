import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackTable from '../components/TrackTable/TrackTable';


class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    // if ajax still loading

    if (!this.props.trackList) {
      return (
        <div className="track-list__spinner">
          <div className="spinner--track-list"></div>
        </div>
      )
    }

    return (
      <TrackTable tracks={this.props.trackList} />
    );

  }
}

function mapStateToProps(state) {
  return {
    trackList: state.trackList
  };
}

export default connect(mapStateToProps)(TrackList);
