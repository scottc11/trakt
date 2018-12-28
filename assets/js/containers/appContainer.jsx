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
import TrackForm from '../components/forms/trackForm';
import GenreForm from '../components/forms/genreForm';
import KeyForm from '../components/forms/keyForm';
import StatusForm from '../components/forms/statusForm';

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

    // UI LISTENERS
    this.props.ScreenResize();
    window.addEventListener("resize", this.props.ScreenResize);
  }

  render() {

    if (!this.props.CurrentUser || !this.props.Projects || !this.props.Genres || !this.props.Keys || !this.props.StatusList ) {
      return <FullScreenSpinner />
    }

    return (
      <div>
        <Header />
        <div>
          <TrackForm />
          <GenreForm />
          <StatusForm />
          <KeyForm />
        </div>
        <Project />
        <MediaPlayer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { CurrentUser: state.currentUser, Projects: state.projects, Genres: state.genres, Keys: state.keys, StatusList: state.statusList };
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
