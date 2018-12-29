import React from 'react';
import UserBadge from '../userBadge';

export default function(activeAudioFile, playFn, pauseFn) {
  return [
    {
      Header: '',
      accessor: 'none',
      Cell: row => {
        if ( row.original.id == activeAudioFile.id && !activeAudioFile.isPlaying || row.original.id !== activeAudioFile.id ) {
          return <i className="txt--turquoise txt--actionable fas fa-play-circle" onClick={ () => playFn(row.original) }></i>
        } else {
          return <i className="txt--turquoise txt--actionable fas fa-pause-circle" onClick={ () => pauseFn(row.original) }></i>
        }
      },
      width: 50,
      style: {
        cursor: "pointer",
        fontSize: 20,
        padding: "0",
        textAlign: "center",
      }
    },
    {
      expander: true,
      Header: '',
      Expander: ({ isExpanded, ...rest }) => isExpanded ? <i className="txt--mikado txt--actionable fas fa-minus"></i> : <i className="txt--mikado txt--actionable fas fa-plus"></i>,
      style: {
        cursor: "pointer",
        fontSize: 16,
        padding: "0",
        textAlign: "center",
        userSelect: "none"
      },
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
    }
  ]
}
