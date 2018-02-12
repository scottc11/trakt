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
    this.state = {
      sidebarOpen: true,
    }

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.listCollaborators = this.listCollaborators.bind(this);
  }

  toggleSidebar() {
    if (this.state.sidebarOpen) {
      this.setState({ sidebarOpen: false });
    } else {
      this.setState({ sidebarOpen: true });
    }
  }

  listCollaborators() {
    return this.props.activeProject.collaborators.map( (user) => {
      return <li key={user.id} ><UserBadge user={user} /></li>;
    });
  }

  render() {

    if (this.state.sidebarOpen) {
      return (
        <div className="project__detail col-xs-3">

          <div className="project__detail--toggle">
            <span onClick={ () => this.toggleSidebar() } className="fa fa-angle-double-left"></span>
          </div>

          <div className="project__detail--header">
            <ProjectList selected={this.props.activeProject} />
          </div>

          <div className="project__detail--collaborators">
            <h4>Collaborators</h4>
            <ul>
              {this.listCollaborators()}
            </ul>
            <hr />
          </div>

          <div className="form--container">
            <h4>Create New Genre</h4>
            <GenreForm />
            <hr />
          </div>

          <div className="form--container">
            <h4>Create New Status</h4>
            <StatusForm />
            <hr />
          </div>

          <div className="form--container">
            <h4>Create New Key</h4>
            <KeyForm />
            <hr />
          </div>

          <div className="form--container">
            <h4>Create New Track</h4>
            <TrackForm />
          </div>
        </div>
      )
    } else {
      return (
        <div className="project__detail project__detail--collapsed col-xs-1">
          <div className="project__detail--toggle">
            <span onClick={ () => this.toggleSidebar() } className="fa fa-angle-double-right"></span>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { activeProject: state.activeProject, currentUser: state.currentUser };
}

export default connect(mapStateToProps)(ProjectDetail);
