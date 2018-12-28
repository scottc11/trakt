import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UpdateTrackInProject } from '../../actions/track_actions';
import AudioFileForm from '../forms/audioFileForm';



class TrackDetailFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormActive: true
    }
    this.deleteAudioFile = this.deleteAudioFile.bind(this);
  }

  deleteAudioFile(event, id, trackID) {
    event.stopPropagation();
    const url = axios.defaults.baseURL + `api/files/${id}/`

    axios.delete(url).then( (response) => {
      this.props.UpdateTrackInProject(trackID);
    })
  }

  render() {
    const files = this.props.track.audio_files.map( (file) => {
      const trackID = this.props.track.id;
      let date = file.pub_date.split('T')[0]
      let style = this.props.active == file.id ? 'track__file-list--active' : '';
      return (
          <li className={ style } key={file.id} onClick={ () => this.props.onSelect(file) }>
            <span className="fa fa-play-circle"></span> {file.title}
            <span className="track__file-list--date-time"> - {date}</span>
            <a href={ file.file } download ><span className="track__file-list--action fa fa-cloud-download"></span></a>
            <span onClick={ (e) => this.deleteAudioFile(e, file.id, trackID) } className="track__file-list--action fa fa-trash"></span>
          </li>
          )
    });

    return (
      <div className="track__file-list">
        <ul>{files}</ul>
        <AudioFileForm track={this.props.track}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ UpdateTrackInProject }, dispatch);
}

export default connect(null, mapDispatchToProps)(TrackDetailFileList);
