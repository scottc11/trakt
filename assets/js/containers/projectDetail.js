import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProjectDetail extends Component {
  render() {
    if (!this.props.project) {
      return <div>Select a proj</div>;
    }

    return (
      <div>
        <h3>Project Detail:</h3>
        <div>{this.props.project.title}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    project: state.activeProject
  };
}

export default connect(mapStateToProps)(ProjectDetail);
