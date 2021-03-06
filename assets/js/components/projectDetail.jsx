import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FetchNotifications } from '../actions/notification_actions';
import UserBadge from './userBadge';
import ProjectList from '../containers/projectList';
import ProjectActivity from './projectActivity';
import GenreForm from './forms/genreForm';
import StatusForm from './forms/statusForm';
import KeyForm from './forms/keyForm';
import TrackForm from './forms/trackForm';
import UploadList from './uploadList';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      height: 800,
    }

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.listCollaborators = this.listCollaborators.bind(this);
    this.props.FetchNotifications();
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
        <div style={ { height: this.props.UI.body.height } } className="project__detail col-xs-3">

          <div className="project__detail--header">
            <ProjectList selected={this.props.activeProject} />
          </div>

          <div className="project__detail--collaborators">
            <h4 className="project__detail--heading">COLLABORATORS</h4>
            <ul>
              {this.listCollaborators()}
            </ul>
            <hr />
          </div>

          <div className="project__detail__activity">
            <h4 className="project__detail--heading">ACTIVITY</h4>
            <ProjectActivity activity={this.props.notifications} />
          </div>
          <hr />
          <div className="">
            <h4 className="project__detail--heading">UPLOADS</h4>
            <UploadList />
            <hr />
          </div>

          <div className="form--container">
            <h4 className="project__detail--heading">Create New Track</h4>
            <TrackForm />
            <hr />
          </div>

          <div className="form--container">
            <h4 className="project__detail--heading">Create New Genre</h4>
            <GenreForm />
            <hr />
          </div>

          <div className="form--container">
            <h4 className="project__detail--heading">Create New Status</h4>
            <StatusForm />
            <hr />
          </div>

          <div className="form--container">
            <h4 className="project__detail--heading">Create New Key</h4>
            <KeyForm />
            <hr />
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
  return {
    activeProject: state.activeProject,
    currentUser: state.currentUser,
    notifications: state.notifications,
    UI: state.UI
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchNotifications }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
