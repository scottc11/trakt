import React, { Component } from 'react';
import { connect } from 'react-redux';

class UploadProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="upload__list">
        <h6 className="upload__detail--label">status: </h6>
        <span className="upload__detail--status">{this.props.uploadProgress.status} </span>
        <h6 className="upload__detail--label">progress: </h6>
        <span className="upload__detail--progress">{this.props.uploadProgress.progress}%</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { uploadProgress: state.uploadProgress };
}

export default connect(mapStateToProps)(UploadProgress);
