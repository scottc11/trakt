import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../actions/actions';

class ProjectList extends Component {
  renderList() {
    return this.props.projects.map((project) => {
      return (
        <li
          key={project.id}
          onClick={() => {this.props.selectProject(project)} }>
          { project.title }
        </li>
      )
    })
  }

  render() {
    return (
      <ul>
        { this.renderList() }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  // whatever is returned ends up in ProjectList as props
  return {
    projects: state.projects
  };
}

// anything returns from this function will end up as props on the projectList container
function mapDispatchToProps(dispatch) {
  // Whenever selectProject is called, the result should be passed to all of our reducers
  return bindActionCreators({ selectProject: selectProject }, dispatch);
}

// Promote ProjectList to a compoinent to a container
// needs to know about displatch method, selectProject
// make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
