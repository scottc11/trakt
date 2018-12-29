import React, { Component } from 'react';
import axios from 'axios';

export default function(props) {

  const options = props.items.map( (item) => {
    return <option key={item.id} value={item.id}>{item.label}</option>;
  })

  return (
    <select name={props.name} onChange={ (e) => props.handleChange(e) }>
      { props.optional && <option value="">------</option>}
      {options}
    </select>
  );
}
