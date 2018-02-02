import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchCurrentUser, fetchGenres, fetchKeys, fetchStatusList } from '../actions/actions';
import FullScreenSpinner from '../components/spinners/FullScreenSpinner';
import ProjectList from '../containers/projectList';
import GenreNew from '../components/genre_new';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.fetchGenres();
    this.props.fetchKeys();
    this.props.fetchStatusList();
  }

  render() {

    if (!this.props.currentUser) {
      return <FullScreenSpinner />
    }

    return (
      <div className="header--bg" >
        <div className="container header">
          <div className="header--heading col-xs-2">
            <a href=""><span>V2</span></a>
          </div>
          <div className="col-xs-6">
            <ProjectList
              items={this.props.currentUser.projects}
              selected={this.props.currentUser.projects[0]}
            />
          </div>
          <div className="header--info col-xs-4">
            <span className="">{ this.props.currentUser.username }</span>
            <a href={ window.location + 'logout/' }><span>Logout</span></a>
          </div>
          <div className="col-xs-12">
            <BrowserRouter>
              <Route path="/new_genre" component={GenreNew} />
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUser, fetchGenres, fetchKeys, fetchStatusList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
