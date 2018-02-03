import React, { Component } from 'react';
import axios from 'axios';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }

    this.validateFile = this.validateFile.bind(this);
  }

  validateFile(event) {
    const file = event.target.files[0];
    const url = axios.defaults.baseURL + 'track/submit/sign_url/'

    const params = {
      filename: file.name,
      type: file.type,
      expiration: 10,
      track_id: this.props.id
    }

    if (file.type.match(`audio/mp3`) || file.type.match(`audio/wav`) ) {
      console.log(true);
      axios.get(url, params).then( res => {
        console.log(res);
      })
    } else {
      alert("Invalid file type.  File must be either '.mp3' or '.wav'");
      event.target.value = event.target.defaultValue;
    }
    console.log(file);
  }


  render() {
    return (
      <div>
        <input type="file" onChange={this.validateFile} ref={ (input) => this.fileInput = input } />
        <input type="button" value="upload" />
      </div>
    )
  }
}


export default FileInput;
