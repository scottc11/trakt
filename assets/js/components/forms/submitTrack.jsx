import React, { Component } from 'react';
import axios from 'axios';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // string
      key: '', // foreign key
      genre: '', // foreign key
      project: '', // foreign key
      bpm: '', // num
      date_recorded: '', // Date object
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = this.state;
    const url = axios.defaults.baseURL + `api/tracks/`;
    axios.post(url, data)
      .then( (res) => {
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TrackForm;
