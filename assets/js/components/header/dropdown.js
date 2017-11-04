import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  render() {
    let menu;
    let toggleClass;
    if (this.state.menuActive) {
      menu = <DropdownItemList items={this.props.items} />
    } else {
      menu = "";
    }
    return (
      <div className="dropdown">
        <div className="dropdown--selected">
          <span>{this.props.selected.title}</span>
          <span className={ this.state.menuActive ? 'dropdown--toggle fa fa-angle-up' : 'dropdown--toggle fa fa-angle-down' } onClick = { this.toggleMenu }></span>
        </div>

        {menu}

      </div>
    )
  }
}

const DropdownItemList = (props) => {
  const items = props.items;
  const listItems = items.map( (item) => <li key={item.id}>{item.title}</li> );
  return (
    <ul>
      {listItems}
    </ul>
  );
}


export default Dropdown;
