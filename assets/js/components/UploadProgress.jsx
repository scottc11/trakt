import React, { Component } from 'react';
import { connect } from 'react-redux';

class UploadProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <span>upload status: </span>
          <span className="upload__detail--status"> {this.props.uploadProgress.status} </span>
        </div>
        <div>
          <span>upload progress: </span>
          <span className="upload__detail--progress"> {this.props.uploadProgress.progress}%</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { uploadProgress: state.uploadProgress };
}

export default connect(mapStateToProps)(UploadProgress);
