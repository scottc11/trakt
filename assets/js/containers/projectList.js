import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProject } from '../actions/actions';
import DropdownItemList from '../components/DropdownItemList'


class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchProject(this.props.selected.id);
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
          <div className="dropdown--selected">{this.props.activeProject.title}</div>
          <div className={ this.state.menuActive ? 'dropdown--toggle fa fa-angle-up' : 'dropdown--toggle fa fa-angle-down' } onClick = { this.toggleMenu }></div>
        </div>

        {menu}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { activeProject: state.activeProject };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProject }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
