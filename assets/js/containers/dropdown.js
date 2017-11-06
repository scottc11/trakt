import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProject } from '../actions/actions';
import DropdownItemList from '../components/DropdownItemList'


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      selected: '------------------------'
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  toggleMenu() {
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  onSelectItem(project) {
    this.props.fetchProject(project.id);
    this.setState({
      menuActive: false,
      selected: project.title
    });
  }

  render() {
    let menu;
    if (this.state.menuActive) {
      menu = <DropdownItemList select={this.onSelectItem} itemList={this.props.items} />
    } else {
      menu = "";
    }
    return (
      <div className={ this.state.menuActive ? 'dropdown dropdown--active' : 'dropdown' }>
        <div>
          <div className="dropdown--selected">{this.state.selected}</div>
          <div className={ this.state.menuActive ? 'dropdown--toggle fa fa-angle-up' : 'dropdown--toggle fa fa-angle-down' } onClick = { this.toggleMenu }></div>
        </div>

        {menu}

      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProject }, dispatch);
}


export default connect(null, mapDispatchToProps)(Dropdown);
