import React, { Component } from 'react';
import { connect } from 'react-redux';

class UploadList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (!this.props.uploadProgress) {
      return <div></div>
    }

    return (
      <div className="upload__list">
        <h6 className="upload__detail--label">status: </h6>
        <span className="upload__detail--status">{this.props.uploadProgress.status} </span>
        <br />
        <h6 className="upload__detail--label">progress: </h6>
        <span className="upload__detail--progress">{this.props.uploadProgress.progress}%</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { uploadProgress: state.uploadProgress };
}

export default connect(mapStateToProps)(UploadList);
