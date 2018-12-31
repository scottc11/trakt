import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProjectList from '../components/projectList';
import UploadProgress from '../components/UploadProgress';


class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header--bg" style={{height: this.props.height}}>
        <div className="container header">
          <div className="header--heading col-xs-1">
            <a href=""><span>V3</span></a>
          </div>
          <div className="col-xs-3">
            <ProjectList />
          </div>

          <div className="col-xs-2 header__actions">
            <span className="txt--actionable" onClick={() => this.props.toggleActionWindowFn() }>
              <i className="fas fa-upload">&#x20;</i>
              Upload
            </span>
          </div>

          <div className="col-xs-3">
            <UploadProgress />
          </div>
          <div className="header--info col-xs-3">
            <span className="">{ this.props.currentUser.username }</span>
            <a href={ axios.defaults.baseURL + 'logout/' }><span>Logout</span></a>
            <a href={ axios.defaults.baseURL + 'admin/' }><span>Admin</span></a>
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
