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
import UploadTrack from '../components/UploadTrack';


class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionWindow: false
    }
    this.toggleActionWindow = this.toggleActionWindow.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.fetchProjects();
    this.props.fetchGenres();
    this.props.fetchKeys();
    this.props.fetchStatusList();

    // UI LISTENERS
    this.props.ScreenResize();
    window.addEventListener("resize", this.props.ScreenResize);
  }

  toggleActionWindow() {
    this.setState({ actionWindow: !this.state.actionWindow });
  }

  render() {

    if (!this.props.CurrentUser || !this.props.Projects || !this.props.Genres || !this.props.Keys || !this.props.StatusList ) {
      return <FullScreenSpinner />
    }

    return (
      <div>
        <Header toggleActionWindowFn={this.toggleActionWindow}/>
        <div className="action-window" style={{ display: this.state.actionWindow ? 'block' : 'none' }}>
          <UploadTrack />
        </div>
        <Project height={this.props.UI.body.height} />
        <MediaPlayer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    CurrentUser: state.currentUser,
    Projects: state.projects,
    Genres: state.genres,
    Keys: state.keys,
    StatusList: state.statusList,
    UI: state.UI
  };
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
