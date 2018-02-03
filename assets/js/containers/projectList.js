import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProject, fetchProjects } from '../actions/actions';
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
    this.props.fetchProjects();
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
      <div>
        <div className={ this.state.menuActive ? 'dropdown dropdown--active' : 'dropdown' }>
          <div>
            <div className="dropdown--selected">{this.props.activeProject.label}</div>
            <div className={ this.state.menuActive ? 'dropdown--toggle fa fa-angle-up' : 'dropdown--toggle fa fa-angle-down' } onClick = { this.toggleMenu }></div>
          </div>
          {menu}
        </div>
        <a href={window.location.href + `project/edit/${this.props.activeProject.id}`}>
          <span className="dropdown__btn--edit fa fa-pencil-square-o"></span>
        </a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { activeProject: state.activeProject };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProject, fetchProjects }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
