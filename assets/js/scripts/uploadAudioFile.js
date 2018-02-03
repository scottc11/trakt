import $ from 'jquery';
import axios from 'axios';
import Cookies from 'js-cookie';

// set scrf token from django cookie
const csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.post['X-CSRFToken'] = csrftoken;

$("document").ready( () => {

  $("#audio-file").change(function() {
    console.log(this.files[0]);

    const fileType = this.files[0].type;

    // validate file type
    if (fileType.match(`audio/mp3`) || fileType.match(`audio/wav`) ) {

      const file = this.files[0];
      const track_id = $('#upload-btn').data('track-id');

      const url = window.location.href.split('upload/')[0] + 'submit/sign_url';
      $.get(url + `?filename=${encodeURIComponent(file.name)}&expiration=10&type=${encodeURIComponent(file.type)}&track_id=${track_id}`, (data) => {
        console.log(data);
        $('#upload-btn').on('click', () => { upload(data.signed_url, data.file_path, file) }).attr('disabled', false);
      })

    } else {
      alert("Invalid file type.  File must be either '.mp3' or '.wav'");
      this.value = this.defaultValue;
    }
  });



  $("#session-file").change(function() {
    console.log(this.files[0]);

    const fileType = this.files[0].type;

    // validate file type
    if (fileType.match('application/zip') ) {

      const file = this.files[0];
      const track_id = $('#upload-btn').data('track-id');

      const url = window.location.href.split('upload/')[0] + 'submit/sign_url';
      $.get(url + `?filename=${encodeURIComponent(file.name)}&expiration=10&type=${encodeURIComponent(file.type)}&track_id=${track_id}`, (data) => {
        console.log(data);
        $('#upload-btn').on('click', () => { upload(data.signed_url, data.file_path, file) }).attr('disabled', false);
      })

    } else {
      alert("Invalid file type.  File must be a '.zip' file.");
      this.value = this.defaultValue;
    }
  });



});

function upload(url, file_path, file) {
  const config = {
    headers: {
      'Content-Type': file.type
    },
    onUploadProgress: progressEvent => {
      let percentLoaded = progressEvent.loaded / progressEvent.total;
      $('#upload-progress').val(percentLoaded);
    }
  }
  axios.put(url, file, config)
    .then(function (res) {
      $('#file-path').attr('value', file_path);
      $('#submit').attr('disabled', false);
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}
