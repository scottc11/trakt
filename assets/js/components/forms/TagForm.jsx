import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../Button';
import { CreateTag } from '../../actions/tag_actions';

class TagForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      hex_code: this.props.tagColors[0].id, // is an id
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.CreateTag(this.state.label, this.state.hex_code);
    this.setState({ label: '' });
  }

  render() {

    const colors = this.props.tagColors.map(color => {
      const colorStyle = { marginLeft: 5, background: color.hex_code, color: 'white'};
      return <span key={color.id} style={colorStyle}>{color.hex_code}</span>
    })

    const options = this.props.tagColors.map( color => {
      return <option key={color.id} value={color.id}> {color.hex_code} </option>
    })

    return (
      <div className="form form__misc">
        <form>
          <label>
            New Tag --
            <input placeholder="ie. 'Chord Progression' " type="text" name="label" value={this.state.label} onChange={this.handleChange} />
          </label>
          <select name="hex_code" onChange={(e) => this.handleChange(e)}>
            {options}
          </select>

          <Button action={(e) => this.handleSubmit(e) } round={false} class="btn btn--orange" label="Create" isDisabled={this.state.label == '' ? true : false} />
        </form>
        <div>
          {colors}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    tagColors: state.tagColors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ CreateTag }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagForm);
