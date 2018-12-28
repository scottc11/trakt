import React from 'react';

export default function(props) {
  return (
    <div className="txt--info">
      <i className="fa fa-info-circle"></i>
      <span>
        {props.text}
      </span>
    </div>
  )
}
