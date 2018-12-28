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
          <div className="col-xs-5 header__actions">

            <span className="txt--actionable">
              <i className="far fa-edit"> </i>
              Edit Project
            </span>

            <span className="txt--actionable" onClick={() => this.props.toggleActionWindowFn() }>
              <i className="fa fa-plus-square"> </i>
              Upload
            </span>

          </div>
          <div className="header--info col-xs-3">
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
