import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProjectList from '../components/projectList';


class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header--bg" >
        <div className="container header">
          <div className="header--heading col-xs-1">
            <a href=""><span>V2</span></a>
          </div>
          <div className="col-xs-3">
            <ProjectList />
          </div>
          <div className="header--info col-xs-8">
            <a href={axios.defaults.baseURL + `project/edit/${this.props.activeProject.id}`}>
              <span className="fa fa-pencil-square-o"></span>
            </a>
            <a href={ axios.defaults.baseURL + 'track/submit/' }><span className="button__submit-track fa fa-plus-square"></span></a>
            <span className="">{ this.props.currentUser.username }</span>
            <a href={ window.location + 'logout/' }><span>Logout</span></a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    activeProject: state.activeProject
  };
}

export default connect(mapStateToProps)(Header);
