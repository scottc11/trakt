import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBadge from './userBadge';
import ProjectList from '../containers/projectList';
import GenreForm from './forms/genreForm';
import StatusForm from './forms/statusForm';
import KeyForm from './forms/keyForm';
import TrackForm from './forms/trackForm';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.listCollaborators = this.listCollaborators.bind(this);
  }

  listCollaborators() {
    return this.props.activeProject.collaborators.map( (user) => {
      return <li key={user.id} ><UserBadge user={user} /></li>;
    });
  }

  render() {
    return (
      <div className="project__detail col-xs-3">

        <div className="project__detail--header">
          <h1>{this.props.project.label}</h1>
          <ProjectList selected={this.props.activeProject} />
          <hr />
        </div>

        <div className="project__detail--collaborators">
          <h4>Collaborators</h4>
          <ul>
            {this.listCollaborators()}
          </ul>
        </div>

        <div className="form--container">
          <h4>Create New Genre</h4>
          <GenreForm />
        </div>

        <div className="form--container">
          <h4>Create New Status</h4>
          <StatusForm />
        </div>

        <div className="form--container">
          <h4>Create New Key</h4>
          <KeyForm />
        </div>

        <div className="form--container">
          <h4>Create New Track</h4>
          <TrackForm />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { activeProject: state.activeProject, currentUser: state.currentUser };
}

export default connect(mapStateToProps)(ProjectDetail);
