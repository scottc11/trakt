import $ from 'jquery';
import axios from 'axios';


$("document").ready( () => {

  $("#audio-file").change(function() {
    console.log('changed');

    console.log(this.files[0]);
    const file = this.files[0];
    const track_id = data.track_id;

    const url = window.location.href.replace('submit/', 'upload/');
    u$.get(url + `?filename=${encodeURIComponent(file.name)}&expiration=10&type=${encodeURIComponent(file.type)}&track_id=${track_id}`, (data) => {
      console.log(data.file_path);
      // upload(data.signed_url, file);
    })

  });
});


function upload(url, file) {
  const config = {
    headers: {
      'Content-Type': file.type
    },
    onUploadProgress: progressEvent => {
      let percentLoaded = progressEvent.loaded / progressEvent.total;
      console.log(percentLoaded);
    }
  }
  axios.put(url, file, config)
    .then(function (res) {
      console.log('Finished');
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}
