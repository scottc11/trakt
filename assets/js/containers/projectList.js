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
      isFetching: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.activeProject.id != nextProps.activeProject.id ) {
      this.setState({ isFetching: false })
    }
  }

  toggleMenu() {
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  onSelectItem(project) {
    if (this.props.activeProject.id !== project.id) {
      this.props.fetchProject(project.id);
      this.setState({
        menuActive: false,
        isFetching: true
      });
    } else { this.setState( { menuActive: false } ) }
  }

  render() {

    document.body.style.cursor = this.state.isFetching ? 'progress' : 'default';

    let menu;
    if (this.state.menuActive) {
      menu = <DropdownItemList select={this.onSelectItem} itemList={this.props.projects} />
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
      </div>
    )
  }
}



function mapStateToProps(state) {
  return { activeProject: state.activeProject, projects: state.projects };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProject }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
