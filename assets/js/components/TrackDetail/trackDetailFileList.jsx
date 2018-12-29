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
          <li className={ style } key={file.id} onClick={ () => this.props.onSelect(this.props.track, index) }>
            <span className="fa fa-play-circle"></span> {file.title}
            <span className="track__file-list--date-time"> - {date}</span>
            <a href={ file.file } download ><span className="track__file-list--action fa fa-cloud-download"></span></a>
            <span onClick={ (e) => this.props.onDeleteFile(file.id, trackID) } className="track__file-list--action fa fa-trash"></span>
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
