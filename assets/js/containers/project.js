import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackList from '../components/trackList';

class Project extends Component {

  render() {
    // if ajax still loading
    if (!this.props.activeProject.tracks) {
      return (
        <div className="track-list__spinner">
          <div className="spinner--track-list">
          </div>
        </div>
      )
    }

    return (
      <div className='project'>
        <TrackList tracks={this.props.activeProject.tracks} status={1} label='Snippets' />
        <TrackList tracks={this.props.activeProject.tracks} status={2} label='Ideas' />
        <TrackList tracks={this.props.activeProject.tracks} status={3} label='Mixing' />
        <TrackList tracks={this.props.activeProject.tracks} status={4} label='Finished' />
      </div>
    );

  }
}


function mapStateToProps(state) {
  return { activeProject: state.activeProject };
}


export default connect(mapStateToProps)(Project);
