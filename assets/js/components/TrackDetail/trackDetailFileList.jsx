import React, { Component } from 'react';
import axios from 'axios';
import AudioFileForm from '../forms/audioFileForm';


class TrackDetailFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormActive: true
    }
  }

  render() {
    const trackID = this.props.track.id;
    const activeFileIndex = this.props.track.activeFileIndex;

    const files = this.props.track.audio_files.map( (file, index) => {
      const date = file.pub_date.split('T')[0];
      const style = this.props.track.activeFileIndex == index ? 'track__file-list--active' : '';
      return (
          <li key={file.id} onClick={ () => this.props.onSelect(this.props.track, index) }>
            <span className={`${style}`}><i className="fas fa-play-circle"></i> {file.title}</span>
            <span className="track__file-list--date-time"> - {date}</span>
            <a href={ file.file } download ><i className="txt--actionable fas fa-cloud-download-alt"></i></a>
            <span onClick={ (e) => this.props.onDeleteFile(file.id, trackID) } className="txt--actionable fas fa-trash-alt"></span>
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


export default TrackDetailFileList;
