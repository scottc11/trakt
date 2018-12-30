import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSignedUrl } from '../../actions/progress_actions';
import Button from '../Button';

class AudioFileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFile = this.validateFile.bind(this);
  }


  validateFile(event) {
    const file = event.target.files[0];

    if (file.type.match(`audio/mp3`) || file.type.match(`audio/wav`) ) {
      this.setState({ disabled: false });
    } else {
      alert("Invalid file type.  File must be either '.mp3' or '.wav'");
      event.target.value = event.target.defaultValue;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const file = this.fileInput.files[0];
    const trackID = this.props.track.id;
    this.props.getSignedUrl(file, trackID)
  }

  render() {
    return(
      <div className="form form__misc">
        <form>
          <label>
            Upload Audio File:
            <input type="file" onChange={this.validateFile} ref={ (input) => this.fileInput = input } />
          </label>
          <Button action={(event) => this.handleSubmit(event) } icon="fas fa-cloud-upload-alt" class="btn btn--orange" label="Upload" isDisabled={this.state.disabled} />
        </form>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { activeProject: state.activeProject };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSignedUrl }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioFileForm);
