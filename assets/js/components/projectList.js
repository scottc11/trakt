import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FetchTrackList } from '../actions/track_actions';
import DropdownItemList from '../components/DropdownItemList'


class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'All Tracks',
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
    if (project.id == -1) { // hack
      this.props.FetchTrackList();
    } else {
      this.props.FetchTrackList(project.id);
    }
    this.setState({
      selection: project.label,
      menuActive: false,
    });
  }

  render() {

    document.body.style.cursor = this.state.isFetching ? 'progress' : 'default';

    return (
      <div className={ this.state.menuActive ? 'dropdown dropdown--active' : 'dropdown' }>
        <div>
          <div className="dropdown--selected">{this.state.selection}</div>
          <div className={ this.state.menuActive ? 'dropdown--toggle fa fa-angle-up' : 'dropdown--toggle fa fa-angle-down' } onClick = { this.toggleMenu }></div>
        </div>
        { this.state.menuActive &&
          <DropdownItemList select={this.onSelectItem} itemList={[{id: -1, label: 'All Tracks'}, ...this.props.projects]} />
        }
      </div>
    )
  }
}



function mapStateToProps(state) {
  return { activeProject: state.activeProject, projects: state.projects };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchTrackList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
