import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { fetchProject } from '../actions/actions';
import TrackTable from '../components/TrackTable/TrackTable';


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount() {
    if (this.props.projects.length > 0) {
      this.props.fetchProject(this.props.projects[0].id);
    } else {
      window.location.href = axios.defaults.baseURL + 'project/new/';
    }
  }

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
        <TrackTable tracks={this.props.activeProject.tracks} />
      </div>
    );

  }
}


function mapStateToProps(state) {
  return {
    activeProject: state.activeProject,
    projects: state.projects,
    UI: state.UI
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
