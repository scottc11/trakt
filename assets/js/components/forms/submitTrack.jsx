import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FormDropdown from './formDropdown';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // string
      key: '', // foreign key
      genre: '', // foreign key
      projects: '', // foreign key
      bpm: '', // num
      date_recorded: '', // Date object
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({projects: nextProps.projects[0]})
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
        <FormDropdown name="projects" handleChange={this.handleChange} items={this.props.projects}/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projects };
}


export default connect(mapStateToProps)(TrackForm);
