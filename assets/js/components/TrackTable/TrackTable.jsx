import React, { Component } from 'react';
import ReactTable from 'react-table';
import config from './table.config';


class TrackTable extends Component {
  constructor(props) {
    super(props);
  }

  playTrack() {
    this.setState({ active: true });
    this.props.updateMediaPlayer(this.state.activeFile.file, true);
  }

  pauseTrack() {
    this.setState({ active: false });
    this.props.updateMediaPlayer(this.state.activeFile.file, false);
  }


  render() {
    return(
      <ReactTable
        data={this.props.tracks}
        columns={config()}
        showPagination={false}
        className="-striped -highlight"
        SubComponent={ row => <div>the sub compnenntss</div>}
      />
    )
  }

}


export default TrackTable;
