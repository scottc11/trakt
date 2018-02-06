import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { createKey } from '../../actions/key_actions';

class KeyForm extends Component {
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
    this.props.createKey(this.state.label);
    this.setState({ label: '' });
  }

  render() {
    return (
      <div className="form form__misc">
        <form onSubmit={this.handleSubmit}>
          <label>
            Key:
            <input placeholder="ie. 'G major' " type="text" name="label" value={this.state.label} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" disabled={this.state.disabled}/>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createKey }, dispatch);
}

export default connect(null, mapDispatchToProps)(KeyForm);
