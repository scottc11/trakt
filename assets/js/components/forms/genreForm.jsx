import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { createGenre } from '../../actions/genre_actions';

class GenreForm extends Component {
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
    this.props.createGenre(this.state.label);
    this.setState({ label: '' });
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Genre:
            <input placeholder="ex. 'electronic'" type="text" name="label" value={this.state.label} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" disabled={this.state.disabled}/>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createGenre }, dispatch);
}

export default connect(null, mapDispatchToProps)(GenreForm);
