import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Button from '../Button';
import { createStatus } from '../../actions/status_actions';

class StatusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      hex_code: '#ff0000',
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
    this.props.createStatus(this.state.label, this.state.hex_code);
    this.setState({ label: '' });
  }

  render() {
    return (
      <div className="form form__misc">
        <form>
          <label>
            New Status -->
            <input placeholder="ie. 'Idea' or 'Mixing' " type="text" name="label" value={this.state.label} onChange={this.handleChange} />
          </label>
          <Button action={(e) => this.handleSubmit(e) } round={false} class="btn btn--orange" label="Create" isDisabled={this.state.label == '' ? true : false} />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createStatus }, dispatch);
}

export default connect(null, mapDispatchToProps)(StatusForm);
