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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = this.state;
    data.projects = [parseInt(data.projects)]
    const url = axios.defaults.baseURL + `api/tracks/`;
    axios.post(url, data)
      .then( (res) => {
        if (res.status == 201) {
          this.setState({ id: res.data.id })
        }
        console.log(res);
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
        <FileInput track={this.state.id} />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projects, genres: state.genres, keys: state.keys, statusList: state.statusList };
}


export default connect(mapStateToProps)(TrackForm);
