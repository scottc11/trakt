import React, { Component } from 'react';

const DropdownItemList = (props) => {

  const listItems = props.itemList.map( (item) => {
    return (
      <li
        onClick={() => props.select(item)}
        key={item.id} >
        {item.title}
      </li>
    )
  });

  return (
    <ul className="dropdown--list">
      {listItems}
    </ul>
  );
}

export default DropdownItemList;
