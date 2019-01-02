import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeleteAudioFile, UpdateActiveFileIndex, DeleteTrack } from '../../actions/track_actions';
import TrackDetailFileList from './trackDetailFileList';
import TrackSessionList from './trackDetailSessionList';
import Button from '../Button';


class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteTrack: false
    }

  }


  render() {
    const track = this.props.track;

    const tags = this.props.track.tags.map(tag => {
      return <span key={tag.id} className="badge badge--tag" style={{background: tag.color.hex_code}}>{tag.label}</span>
    })

    return (
      <div className="track__details">

        <h2 className="txt--fnt--console txt--turquoise" >{track.title}</h2>
        <div>
          {tags}
        </div>
        <div>
          <span className="badge badge--bpm">{ track.bpm }</span>
          <span className="badge badge--key">{ track.key }</span>
          <span className="badge badge--genre">{ track.genre }</span>
        </div>

        <h6>uploaded: <span title={track.pub_date} className="track__info--date">{ new Date(track.pub_date).toDateString() }</span></h6>
        <h6>recorded: <span className="track__info--date">{ new Date(track.date_recorded).toDateString() }</span></h6>
        <h6>projects: <span>{track.projects.map( p => `${p}, `)}</span></h6>

        <hr/>

        <div>
          <h4 className="txt--fnt--hairline">files</h4>
          <TrackDetailFileList onSelect={this.props.UpdateActiveFileIndex} onDeleteFile={this.props.DeleteAudioFile} track={track} />
        </div>

        <hr/>

        <div>
          <h4 className="txt--fnt--hairline">sessions</h4>
          <TrackSessionList track={track} />
        </div>

        <hr/>

        <div style={{textAlign: 'right'}}>
          <Button action={() => window.location.href = `${axios.defaults.baseURL}admin/main/track/${track.id}/change/` } icon="far fa-edit" class="btn btn--blue" label="Edit Track"/>
          { this.state.deleteTrack == false &&
            <Button action={() => this.setState({deleteTrack: true}) } icon="fas fa-trash-alt" class="btn btn--red" label="Delete Track" />
          }
          { this.state.deleteTrack &&
            <React.Fragment>
              <span className="txt--mikado">Are you sure? This will delete all sessions and files associated with this track.</span>
              <Button action={() => this.props.DeleteTrack(track.id) } icon="fas fa-trash-alt" class="btn btn--red" label="Yes" />
              <Button action={() => this.setState({deleteTrack: false}) } class="btn btn--empty" label="cancel" />
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ DeleteAudioFile, UpdateActiveFileIndex, DeleteTrack }, dispatch);
}

export default connect(null, mapDispatchToProps)(TrackDetail);
