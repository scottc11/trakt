import React from 'react';
import UserBadge from './components/userBadge';

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
      filterable: false,
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
      accessor: 'title',
      filterable: true,
      width: 250,
      Cell: row => <span>{row.original.title}</span>
    },
    {
      Header: 'Tags',
      accessor: 'tags',
      minWidth: 300,
      filterMethod: (filter, row, column) => {
          const id = filter.pivotId || filter.id
          const value = typeof filter.value === 'string' ? filter.value.toLowerCase() : filter.value;
          const searchArray = () => {
            let boolVal = false;
            for (let i = 0; i < row[id].length; i++) {
              if (String(row[id][i].label.toLowerCase()).startsWith(value)) {
                boolVal = true
              }
            }
            return boolVal;
          }
          return row[id] !== undefined ? searchArray() : true
        },
      style: {
        overflowX: 'scroll',
        textOverflow: 'unset',
      },
      Cell: row => row.original.tags.map( tag => {
        return <span key={tag.id} className="badge badge--tag" style={{background: tag.color.hex_code}}>{tag.label}</span>
      })
    },
    {
      Header: 'Project',
      accessor: 'projects',
      filterMethod: (filter, row, column) => {
          const id = filter.pivotId || filter.id
          const value = typeof filter.value === 'string' ? filter.value.toLowerCase() : filter.value;
          const searchArray = () => {
            let boolVal = false;
            for (let i = 0; i < row[id].length; i++) {
              if (String(row[id][i].toLowerCase()).startsWith(value)) {
                boolVal = true
              }
            }
            return boolVal;
          }
          return row[id] !== undefined ? searchArray() : true
        },
      Cell: row => row.original.projects.map( project => {
        return <span key={project}>{project} </span>
      })
    },
    {
      Header: 'BPM',
      accessor: 'bpm',
      width: 50,
      style: {
        textAlign: 'center'
      },
      Cell: row => <span className="badge badge--bpm">{ row.original.bpm }</span>
    },
    {
      Header: 'Key',
      accessor: 'key',
      width: 100,
      style: {
        textAlign: 'center'
      },
      Cell: row => <span className="badge badge--key">{ row.original.key }</span>
    },
    {
      Header: 'Date Recorded',
      accessor: 'date_recorded',
      style: {
        textAlign: 'center'
      },
      Cell: row => <span className="track__info--date">{ new Date(row.original.date_recorded).toDateString() }</span>
    },
    {
      Header: 'Uploader',
      accessor: 'submitter.username',
      style: {
        textAlign: 'center'
      },
    },
    // {
    //   Header: 'Uploaded',
    //   accessor: 'pub_date',
    //   Cell: row => {
    //     const pub_date = new Date(row.original.pub_date).toDateString();
    //     return <span title={pub_date} className="track__info--date">{ pub_date }</span>
    //   }
    // },
    // {
    //   Header: 'Status',
    //   accessor: 'status.label'
    // },
    // {
    //   Header: 'Genre',
    //   accessor: 'genre',
    //   Cell: row => <span className="badge badge--genre">{ row.original.genre }</span>
    // },
  ]
}
