import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PlayAudioFile, PauseAudioFile } from '../actions/mediaPlayerActions';
import config from '../table.config';
import TrackDetail from '../components/TrackDetail';

class TrackTable extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    if (!this.props.trackList) {
      return (
        <div className="track-list__spinner">
          <div className="spinner--track-list"></div>
        </div>
      )
    }

    return (
      <ReactTable
        data={this.props.trackList}
        filterable={true}
        defaultFilterMethod={ (filter, row, column) => {
            const id = filter.pivotId || filter.id
            if (!row[id]) { return false }
            const value = typeof filter.value === 'string' ? filter.value.toLowerCase() : filter.value;
            return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(value) : true
          }
        }
        columns={config(this.props.activeTrack, this.props.PlayAudioFile, this.props.PauseAudioFile)}
        showPagination={false}
        style={{height: this.props.height}}
        className="-striped -highlight"
        loading={this.props.UI.isFetching}
        SubComponent={ row => <TrackDetail track={row.original} /> }
      />
    )
  }

}

function mapStateToProps(state) {
  return { activeTrack: state.activeTrack, trackList: state.trackList, UI: state.UI }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ PlayAudioFile, PauseAudioFile }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);
