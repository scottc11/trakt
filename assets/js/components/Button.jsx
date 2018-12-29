import React, { Component } from 'react';

class Button extends Component {
  render() {
    const styles = {
      display: this.props.inline ? 'inline-block' : 'block',
      borderRadius: this.props.round ? 25 : 5,
      color: this.props.color ? this.props.color : null,
      ...this.props.styleOverides
    }

    const icon = this.props.icon ? <i className={this.props.icon}></i> : '';

    return (
      <span onClick={this.props.action} className={`${this.props.class}`} style={styles}>{icon} {this.props.label}</span>
    )
  }
}

Button.defaultProps = {
  class: 'btn btn--blue',
  label: 'Submit',
  inline: true,
  round: true,
  styleOverides: {}
}

export default Button;
