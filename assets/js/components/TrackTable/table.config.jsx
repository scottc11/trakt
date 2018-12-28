import React from 'react';
import UserBadge from '../userBadge';

export default function(activeAudioFile, playFn, pauseFn) {
  return [
    {
      Header: '',
      accessor: 'none',
      Cell: row => {
        if ( row.original.audio_files[0].file == activeAudioFile.url && !activeAudioFile.isPlaying || row.original.audio_files[0].file !== activeAudioFile.url ) {
          return <i className="fas fa-play" onClick={ () => playFn(row.original.audio_files[0].file) }></i>
        } else {
          return <i className="fas fa-pause" onClick={ () => pauseFn(row.original.audio_files[0].file) }></i>
        }
      },
      width: 50,
      style: {
        cursor: "pointer",
        fontSize: 16,
        padding: "0",
        textAlign: "center",
      }
    },
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'BPM',
      accessor: 'bpm',
      Cell: row => <span className="badge badge--bpm">{ row.original.bpm }</span>
    },
    {
      Header: 'Date Recorded',
      accessor: 'date_recorded',
      Cell: row => <span className="track__info--date">{ new Date(row.original.date_recorded).toDateString() }</span>
    },
    {
      Header: 'Genre',
      accessor: 'genre',
      Cell: row => <span className="badge badge--genre">{ row.original.genre }</span>
    },
    {
      Header: 'Key',
      accessor: 'key',
      Cell: row => <span className="badge badge--key">{ row.original.key }</span>
    },
    {
      Header: 'Uploaded',
      accessor: 'pub_date',
      Cell: row => {
        const pub_date = new Date(row.original.pub_date).toLocaleString()
        return <span title={pub_date} className="track__info--date">{ pub_date }</span>
      }
    },
    {
      Header: 'Status',
      accessor: 'status.label'
    },
    {
      Header: 'Submitter',
      accessor: 'submitter.username',
      Cell: row => <UserBadge user={row.original.submitter} />
    },
    {
      expander: true,
      Header: '',
      Expander: ({ isExpanded, ...rest }) => isExpanded ? <i className="txt--actionable fas fa-angle-double-up"></i> : <i className="txt--actionable fas fa-angle-double-down"></i>,
      style: {
        cursor: "pointer",
        fontSize: 16,
        padding: "0",
        textAlign: "center",
        userSelect: "none"
      },
    }
  ]
}
