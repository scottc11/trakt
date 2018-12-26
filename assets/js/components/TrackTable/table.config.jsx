import React from 'react';
import UserBadge from '../userBadge';

export default function() {
  return [
    {
      Header: '',
      accessor: 'none',
      Cell: row => {
        return <span className="fa fa-play" onClick={() => console.log('clicks') }></span>
      },
      width: 50
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
  ]
}
