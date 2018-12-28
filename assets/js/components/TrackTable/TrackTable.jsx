import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PlayAudioFile, PauseAudioFile } from '../../actions/mediaPlayerActions';
import config from './table.config';
import TrackDetail from '../TrackDetail';

class TrackTable extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <ReactTable
        data={this.props.tracks}
        columns={config(this.props.activeTrack, this.props.PlayAudioFile, this.props.PauseAudioFile)}
        showPagination={false}
        className="-striped -highlight"
        SubComponent={ row => <TrackDetail track={row.original} /> }
      />
    )
  }

}

function mapStateToProps(state) {
  return { activeTrack: state.activeTrack }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ PlayAudioFile, PauseAudioFile }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);