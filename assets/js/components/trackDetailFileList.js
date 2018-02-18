import React, { Component } from 'react';
import AudioFileForm from './forms/audioFileForm';


class TrackDetailFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormActive: true
    }
  }

  render() {

    const files = this.props.track.audio_files.map( (file) => {
      let date = file.pub_date.split('T')[0]
      let style = this.props.active == file.id ? 'track__file-list--active' : '';
      return (
          <li className={ style } key={file.id} onClick={ () => this.props.onClick(file) }>
            <span className="fa fa-play-circle"></span> {file.title}
            <span className="track__file-list--date-time"> - {date}</span>
            <a href={ file.file } download ><span className="track__file-list--action fa fa-cloud-download"></span></a>
          </li>
          )
    });

    return (
      <div className="track__file-list">
        <ul>{files}</ul>
        <AudioFileForm track={this.props.track}/>
        <hr />
      </div>
    )
  }
}

export default TrackDetailFileList;
