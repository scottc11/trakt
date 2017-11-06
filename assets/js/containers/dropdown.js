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
      selected: ''
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
    // go and fetch data
    this.props.fetchProject(project.id);
    this.setState({ selected: project.title });
  }

  render() {
    let menu;
    let toggleClass;
    if (this.state.menuActive) {
      menu = <DropdownItemList select={this.onSelectItem} itemList={this.props.items} />
    } else {
      menu = "";
    }
    return (
      <div className="dropdown">
        <div className="dropdown--selected">
          <span>{this.props.selected.title}</span>
          <span className={ this.state.menuActive ? 'dropdown--toggle fa fa-angle-up' : 'dropdown--toggle fa fa-angle-down' } onClick = { this.toggleMenu }></span>
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
