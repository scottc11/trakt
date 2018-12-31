import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTrackFile } from '../../actions/track_actions';
import { updateUploadProgress, updateUploadStatus } from '../../actions/progress_actions';
import FormDropdown from './formDropdown';
import Button from '../Button';


class TrackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // string
      key: null, // foreign key
      genre: null, // foreign key
      tags: [],
      projects: this.props.projects[0].id, // foreign key
      bpm: 100, // num
      status: null, // string
      date_recorded: new Date().toDateInputValue(), // Date object
      disabled: true
    };
    this.validateFile = this.validateFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  uploadFile(trackID) {
    const url = axios.defaults.baseURL + 'track/submit/sign_url/'
    const file = this.fileInput.files[0];
    let filePath = '';
    const params = {
      filename: file.name,
      type: file.type,
      expiration: '10',
      track_id: trackID
    }
    // get the signed_url from server
    axios.get(url, { params: params }).then( res => {

      this.props.updateUploadStatus('Preparing upload')

      if (res.status == 200) {
        filePath = res.data.file_path;
        const config = {
          headers: { 'Content-Type': file.type },
          onUploadProgress: (progressEvent) => {
            this.props.updateUploadProgress(progressEvent.loaded, progressEvent.total);
          }
        }
        // upload file directly to gcloud
        this.props.updateUploadStatus('Uploading')
        axios.put(res.data.signed_url, file, config)
          .then( (res) => {

            this.props.updateUploadStatus('Uploaded');

            // create trackFile object via action
            // on success, action will fetchProject to update UI
            this.props.createTrackFile(filePath, trackID, this.props.activeProject.id);
          })
          .catch( err => this.props.updateUploadStatus('error') );
      }
    }).catch( err => this.props.updateUploadStatus('error') );
  }

  validateFile(event) {
    const file = event.target.files[0];
    const fileName = file.name.split('.')[0];

    if (file.type.match(`audio/mp3`) || file.type.match(`audio/wav`) ) {
      this.setState(
        {
          disabled: false,
          title: fileName,
          date_recorded: new Date(file.lastModified).toDateInputValue()
        }
      );
    } else {
      alert("Invalid file type.  File must be either '.mp3' or '.wav'");
      event.target.value = event.target.defaultValue;
    }
  }

  handleChange(event) {
    if (event.target.type == "select-multiple") {
      const selected = Array.apply(null, event.target.selectedOptions).map( opt => parseInt(opt.value))
      this.setState({[event.target.name]: selected});
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = this.state;
    const file = this.fileInput.files[0];

    data.projects = [parseInt(data.projects)] // API takes an array for track post
    const url = axios.defaults.baseURL + `api/tracks/`;

    axios.post(url, data)
      .then( (response) => {
        if (response.status == 201) {
          this.props.updateUploadStatus('Track Created')
          this.uploadFile(response.data.id) // passing track id
        }
      })
      .catch( err => {
        this.props.updateUploadStatus('error')
      } );
  }

  render() {

    const tagOptions = this.props.tags.map( item => {
      return <option key={item.id} value={item.id}>{item.label}</option>;
    })

    return (
      <div className="form form__track">
        <form>
          <label>
            File:
            <input type="file" onChange={this.validateFile} ref={ (input) => this.fileInput = input } />
          </label>
          <label>
            Title:
            <input placeholder="ex. 'Ur Mom' " type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            BPM:
            <input placeholder="ex. 100" type="text" name="bpm" value={this.state.bpm} onChange={this.handleChange} />
            <span className="form--required">* required</span>
          </label>
          <label>
            Date:
            <input placeholder="Date" type="date" name="date_recorded" value={this.state.date_recorded} onChange={this.handleChange} />
          </label>
          <div>
            <p>Tags:</p>
            <select multiple={true} size={5} name="tags" onChange={ (e) => this.handleChange(e) }>
              {tagOptions}
            </select>
          </div>

          <label>
            Project:
            <FormDropdown label="Project" name="projects" handleChange={this.handleChange} items={this.props.projects} optional={false} />
            <span className="form--required">* required</span>
          </label>
          <label>
            Genre:
            <FormDropdown label="Genre" name="genre" handleChange={this.handleChange} items={this.props.genres} optional={true}/>
          </label>
          <label>
            Key:
            <FormDropdown label="Key" name="key" handleChange={this.handleChange} items={this.props.keys} optional={true}/>
          </label>
          <label>
            Status:
            <FormDropdown label="Status" name="status" handleChange={this.handleChange} items={this.props.statusList} optional={true}/>
          </label>
          <Button action={(event) => this.handleSubmit(event) } round={false} icon="fas fa-upload" class="btn btn--orange" label="Upload" isDisabled={this.state.disabled} />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    genres: state.genres,
    keys: state.keys,
    tags: state.tags,
    statusList: state.statusList,
    activeProject: state.activeProject
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createTrackFile, updateUploadProgress, updateUploadStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackForm);
