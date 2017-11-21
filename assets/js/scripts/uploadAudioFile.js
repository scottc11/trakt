import $ from 'jquery';
import axios from 'axios';


$("document").ready( () => {
  console.log('window loaded');

  $("#id_audio_file").change(function() {
    console.log('changed');

    console.log(this.files[0]);
    const file = this.files[0]

    const url = window.location.href.replace('submit/', 'upload/');
    $.get(url + `?filename=${encodeURIComponent(file.name)}&expiration=10&type=${encodeURIComponent(file.type)}`, (data) => {
      console.log(data.signed_url);
      console.log(file.name);
      upload(data.signed_url, file);
    })

  });
});


function upload(url, file) {
  const config = {
    headers: {
      'Content-Type': file.type
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
