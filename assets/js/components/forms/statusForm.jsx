import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { createStatus } from '../../actions/status_actions';

class StatusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      disabled: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createStatus(this.state.label);
    this.setState({ label: '' });
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Status:
            <input placeholder="ie. 'Idea' or 'Mixing' " type="text" name="label" value={this.state.label} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" disabled={this.state.disabled}/>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createStatus }, dispatch);
}

export default connect(null, mapDispatchToProps)(StatusForm);
