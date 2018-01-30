import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackList from '../components/trackList';
import ProjectDetail from '../components/projectDetail';


class Project extends Component {

  render() {
    // if ajax still loading
    if (!this.props.activeProject.tracks) {
      return (
        <div className="track-list__spinner">
          <div className="spinner--track-list"></div>
        </div>
      )
    }

    return (
      <div className='project'>
        <ProjectDetail project={this.props.activeProject} />
        <TrackList tracks={this.props.activeProject.tracks} />
      </div>
    );

  }
}


function mapStateToProps(state) {
  return { activeProject: state.activeProject };
}


export default connect(mapStateToProps)(Project);
