import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { fetchCurrentUser, fetchProjects } from '../actions/actions';
import { FetchTagColors, FetchTags } from '../actions/tag_actions';
import { FetchTrackList } from '../actions/track_actions';
import { fetchKeys } from '../actions/key_actions';
import { fetchGenres } from '../actions/genre_actions';
import { fetchStatusList } from '../actions/status_actions';
import { ScreenResize } from '../actions/ui_actions';
import { FetchNotifications } from '../actions/notification_actions';
import Header from './header';
import TrackTable from './TrackTable';
import MediaPlayer from './mediaPlayer'
import FullScreenSpinner from '../components/spinners/FullScreenSpinner';
import UploadTrack from '../components/UploadTrack';
import Activity from '../components/Activity';


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
    this.props.FetchTagColors();
    this.props.FetchTags();
    this.props.FetchTrackList();
    this.props.fetchProjects();
    this.props.fetchGenres();
    this.props.fetchKeys();
    this.props.FetchNotifications();
    this.props.fetchStatusList();

    // UI LISTENERS
    this.props.ScreenResize();
    window.addEventListener("resize", this.props.ScreenResize);
  }

  toggleActionWindow() {
    this.setState({ actionWindow: !this.state.actionWindow });
  }

  render() {

    if (!this.props.CurrentUser || !this.props.Notifications || !this.props.Projects || !this.props.Genres || !this.props.Keys || !this.props.StatusList || !this.props.tagColors || !this.props.tags ) {
      return <FullScreenSpinner />
    }

    return (
      <div>
        <Header toggleActionWindowFn={this.toggleActionWindow}/>
        <div className="action-window container" style={{ display: this.state.actionWindow ? 'block' : 'none' }}>
          <UploadTrack />
        </div>
        <TrackTable height={this.props.UI.body.height} />
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
    Notifications: state.notifications,
    Keys: state.keys,
    StatusList: state.statusList,
    tags: state.tags,
    tagColors: state.tagColors,
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
    FetchTrackList,
    FetchNotifications,
    ScreenResize,
    FetchTagColors,
    FetchTags,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
