import React, { Component } from 'react';
import axios from 'axios';

class FormDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {

    const options = this.props.projects.map( (prj) => {
      return (<option key={prj.id} value={prj.id}>{prj.name}</option>)
    })

    return (
      <label>
        Project:
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>

    );
  }
}

export default TrackForm;
