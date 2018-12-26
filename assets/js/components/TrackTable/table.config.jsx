import React from 'react';

export default function() {
  return [
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'BPM',
      accessor: 'bpm'
    },
    {
      Header: 'Date Recorded',
      accessor: 'date_recorded'
    },
    {
      Header: 'Genre',
      accessor: 'genre'
    },
    {
      Header: 'Key',
      accessor: 'key'
    },
    {
      Header: 'Uploaded',
      accessor: 'pub_date'
    },
    {
      Header: 'Status',
      accessor: 'status.label'
    },
    {
      Header: 'Submitter',
      accessor: 'submitter.username'
    },
  ]
}
