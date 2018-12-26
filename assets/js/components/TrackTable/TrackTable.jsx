import React, { Component } from 'react';
import ReactTable from 'react-table';
import config from './table.config';


class TrackTable extends Component {

  render() {
    return(
      <ReactTable
        data={this.props.tracks}
        columns={config()}
      />
    )
  }

}


export default TrackTable;
