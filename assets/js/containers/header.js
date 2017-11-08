import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser } from '../actions/actions';

import FullScreenSpinner from '../components/spinners/FullScreenSpinner';
import Dropdown from '../containers/dropdown';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {

    if (!this.props.currentUser) {
      return <FullScreenSpinner />
    }

    return (
      <div className="header--bg" >
        <div className="container header">
          <div className="header--heading col-xs-2">
            <a href=""><span>YEYE</span></a>
          </div>
          <div className="col-xs-6">
            <Dropdown
              items={this.props.currentUser.projects}
              selected={this.props.currentUser.projects[0]}
            />
          </div>
          <div className="header--info col-xs-4">
            <a href={ window.location.href + 'submit/' }><span className="button__submit-track fa fa-plus-square"></span></a>
            <span className="">{ this.props.currentUser.username }</span>
            <a href={ window.location + 'logout/' }><span>Logout</span></a>
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
  return bindActionCreators({ fetchCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
