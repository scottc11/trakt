import React, { Component } from 'react';

const DropdownItemList = (props) => {

  const listItems = props.itemList.map( (item) => {
    return (
      <li
        onClick={() => props.select(item)}
        key={item.id} >
        {item.label}
      </li>
    )
  });

  return (
    <ul className="dropdown__list">
      {listItems}
      <a href={ window.location.href + 'project/new/' }><li className="dropdown__list--add">New Project</li></a>
    </ul>
  );
}

export default DropdownItemList;
