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

    const url = window.location.href.split('upload/')[0] + 'submit/sign_url';
    $.get(url + `?filename=${encodeURIComponent(file.name)}&expiration=10&type=${encodeURIComponent(file.type)}&track_id=${track_id}`, (data) => {
      console.log(data);
      $('#upload-btn').on('click', () => { upload(data.signed_url, data.file_path, file) }).attr('disabled', false);
    })

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


$('#json-me').on('click', () => {

  const formData = $("#track-form").serializeArray();
  let values = {};
  let projectSelections = [];


  // get all selected options and put into array
  let projectInput = document.getElementById('id_projects');
  for (var i = 0; i < projectInput.options.length; i++) {
	  if (projectInput.options[i].selected == true) {
		  projectSelections.push(projectInput.options[i].value);
    }
  }

  // convert form array into json key value pairs
  for (var i = 0; i < formData.length; i++) {

    // serializer expects arrays for m2m fields
    if (formData[i]['name'] == 'projects') {
      values[formData[i]['name']] = projectSelections;
    } else {
      values[formData[i]['name']] = formData[i]['value'];
    }
  }

  console.log(values);
  submitForm(values);

})

function submitForm(formData) {
  const data = formData;
  const url = window.location.href.split('track/')[0] + `api/tracks/`;
  axios.post(url, data)
    .then(function (res) {
      // hide form

      // show upload track button
      // attach track id to data attribute of button
      $('#upload-btn').data('track-id', res.data.id);
      // display progress bar
      // update track.audio_file value with new gcloud url
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateTrack(id) {
  const url = window.location.href.split('track/')[0] + `api/tracks/${id}`;
}
