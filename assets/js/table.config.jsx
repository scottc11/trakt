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
      Cell: row => <span>{row.original.title}</span>
    },
    {
      Header: 'BPM',
      accessor: 'bpm',
      width: 50,
      Cell: row => <span className="badge badge--bpm">{ row.original.bpm }</span>
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
      Header: 'Status',
      accessor: 'status.label'
    },
    {
      Header: 'Tags',
      accessor: 'tags',
      width: 150,
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
      Header: 'Date Recorded',
      accessor: 'date_recorded',
      Cell: row => <span className="track__info--date">{ new Date(row.original.date_recorded).toDateString() }</span>
    },
    {
      Header: 'Uploaded',
      accessor: 'pub_date',
      Cell: row => {
        const pub_date = new Date(row.original.pub_date).toDateString();
        return <span title={pub_date} className="track__info--date">{ pub_date }</span>
      }
    },
    {
      Header: 'Uploader',
      accessor: 'submitter.username',
    }
  ]
}
