import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FormDropdown from './formDropdown';
import FileInput from './fileInput';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // string
      key: this.props.keys[0].id, // foreign key
      genre: this.props.genres[0].id, // foreign key
      projects: this.props.projects[0].id, // foreign key
      bpm: '', // num
      status: this.props.statusList[0].id, // string
      date_recorded: '', // Date object
      id: null,
    };
    this.validateFile = this.validateFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  uploadFile(trackID) {
    const url = axios.defaults.baseURL + 'track/submit/sign_url/'
    const file = this.fileInput.files[0];

    const params = {
      filename: file.name,
      type: file.type,
      expiration: '10',
      track_id: trackID
    }
    // get the signed_url from server
    axios.get(url, { params: params }).then( res => {
      console.log(res);
      if (res.status == 200) {
        // upload to directly to gcloud

        const config = {
          headers: {
            'Content-Type': file.type
          }
        }

        axios.put(res.data.signed_url, file, config).then( res => console.log(res) );
      }
    })
  }

  validateFile(event) {
    const file = event.target.files[0];

    if (file.type.match(`audio/mp3`) || file.type.match(`audio/wav`) ) {
      console.log('valid');
    } else {
      alert("Invalid file type.  File must be either '.mp3' or '.wav'");
      event.target.value = event.target.defaultValue;
    }
    console.log(file);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = this.state;
    data.projects = [parseInt(data.projects)]
    const url = axios.defaults.baseURL + `api/tracks/`;
    axios.post(url, data)
      .then( (res) => {
        console.log(res);
        if (res.status == 201) {
          this.uploadFile(res.data.id) // passing track id
        }
      })
      .catch( err => console.log(err) );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          BPM:
          <input type="text" name="bpm" value={this.state.bpm} onChange={this.handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date_recorded" value={this.state.date_recorded} onChange={this.handleChange} />
        </label>
        <FormDropdown label="Project" name="projects" handleChange={this.handleChange} items={this.props.projects}/>
        <FormDropdown label="Genre" name="genre" handleChange={this.handleChange} items={this.props.genres}/>
        <FormDropdown label="Key" name="key" handleChange={this.handleChange} items={this.props.keys}/>
        <FormDropdown label="Status" name="status" handleChange={this.handleChange} items={this.props.statusList}/>
        <input type="submit" value="Submit" />
        <input type="file" onChange={this.validateFile} ref={ (input) => this.fileInput = input } />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projects, genres: state.genres, keys: state.keys, statusList: state.statusList };
}


export default connect(mapStateToProps)(TrackForm);
