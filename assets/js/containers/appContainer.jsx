import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { fetchCurrentUser } from '../actions/actions';
import { fetchProjects } from '../actions/actions';
import { fetchKeys } from '../actions/key_actions';
import { fetchGenres } from '../actions/genre_actions';
import { fetchStatusList } from '../actions/status_actions';
import { ScreenResize } from '../actions/ui_actions';
import Header from './header';
import Project from './project';
import MediaPlayer from './mediaPlayer'
import FullScreenSpinner from '../components/spinners/FullScreenSpinner';

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.fetchProjects();
    this.props.fetchGenres();
    this.props.fetchKeys();
    this.props.fetchStatusList();
    this.props.ScreenResize();
    window.addEventListener("resize", this.props.ScreenResize);
  }

  render() {

    if (!this.props.currentUser || !this.props.projects) {
      return <FullScreenSpinner />
    }

    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Project />
        </div>
        <MediaPlayer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser, projects: state.projects };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCurrentUser,
    fetchProjects,
    fetchGenres,
    fetchKeys,
    fetchStatusList,
    ScreenResize
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
