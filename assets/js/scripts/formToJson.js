import $ from 'jquery';
import axios from 'axios';
import Cookies from 'js-cookie';

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

  submitForm(values);
})

function submitForm(formData) {
  const data = formData;
  const url = window.location.href.split('track/')[0] + `api/tracks/`;
  axios.post(url, data)
    .then(function (res) {
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
