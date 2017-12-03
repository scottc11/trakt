import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createGenre } from '../actions/actions';


// NOTE: Redux-Form is a helper library which handles all the action creators for a form.
// Allowing us to by-pass the need to create all these by hand.

// field argument is sent by redux-form
// field object contains some event handlers
// the '...' syntax just tells ES6 to apply all 'event-handlers' attached to the
// field object.  (ie. onChange={field.input.onChange} )


class GenreNew extends Component {

  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" {...field.input} />
        <div className="text-help">
          { field.meta.touched ? field.meta.error : '' }
        </div>
      </div>
    )
  }

  onSubmit(values) {
    console.log(values);
    this.props.createGenre(values);
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <Field
          label="Genre"
          name="genre"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

// FORM VALIDATION
// NOTE: if errors object is empty, redux-form assumes form is valid
// NOTE: errors object keys need to mirror input 'name' property
// values object contains all the values the user entered into the form
function validate(values) {
  const errors = {};

  // validate inputs from values object
  if (values.genre && values.genre.length > 99) {
    errors.genre = "Input is too large."
  }
  if (!values.genre) {
    errors.genre = "Enter a musical Genre."
  }
  return errors;
}

// validate function gets called automatically when user presses submit
// hooks up form to reducer
export default reduxForm({
  validate: validate,
  form: 'GenreNewForm'
})(
  connect(null, { createGenre })(GenreNew)
);
