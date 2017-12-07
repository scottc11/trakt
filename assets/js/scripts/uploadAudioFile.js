import $ from 'jquery';
import axios from 'axios';
import Cookies from 'js-cookie';

// set scrf token from django cookie
const csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.post['X-CSRFToken'] = csrftoken;

$("document").ready( () => {

  $("#audio-file").change(function() {
    console.log('changed');

    console.log(this.files[0]);
    const file = this.files[0];
    const track_id = $('#upload-btn').data('track-id');

    const url = window.location.href.split('upload/')[0] + 'sign_url';
    $.get(url + `?filename=${encodeURIComponent(file.name)}&expiration=10&type=${encodeURIComponent(file.type)}&track_id=${track_id}`, (data) => {
      console.log(data);
      $('#upload-btn').on('click', () => { upload(data.signed_url, file) });
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
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}


$('#json-me').on('click', () => {
  const formData = $("#track-form").serializeArray();

  let values = {}

  // convert form array into json key value pairs
  for (var i = 0; i < formData.length; i++){
    values[formData[i]['name']] = formData[i]['value'];
  }
  console.log(values);
  submitForm(values);
  // const data = JSON.stringify(values);

})

function submitForm(formData) {
  const data = formData;
  const url = window.location.href.split('track/')[0] + `api/tracks/`;
  axios.post(url, data)
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateTrack(id) {
  const url = window.location.href.split('track/')[0] + `api/tracks/${id}`;
}
