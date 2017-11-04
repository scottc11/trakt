import React, { Component } from 'react';

import Dropdown from './header/dropdown';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header--bg" >
        <div className="container header">
          <div className="header--heading col-xs-2">
            <a href=""><span>YEYE</span></a>
          </div>
          <div className="col-xs-6">
            <Dropdown
              items={this.props.projects}
              selected={this.props.currentProject}
            />
          </div>
          <div className="header--info col-xs-4">
            <a href=""><span className="button__submit-track fa fa-plus-square"></span></a>
            <span className="">{ this.props.user.username }</span>
            <a href={ window.location + 'logout/' }><span className="">Logout</span></a>
          </div>
        </div>
      </div>
    )
  }

}

export default Header;
