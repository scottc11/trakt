import React from 'react';
import TrackForm from '../components/forms/trackForm';
import GenreForm from '../components/forms/genreForm';
import KeyForm from '../components/forms/keyForm';
import StatusForm from '../components/forms/statusForm';
import UploadProgress from '../components/UploadProgress';
import InfoText from './InfoText';

export default function(props) {
  return (
    <div className="container">
      <div className="col-xs-12 col-sm-6">
        <TrackForm />
        <UploadProgress />
      </div>
      <div className="col-xs-12 col-sm-6">
        <GenreForm />
        <StatusForm />
        <KeyForm />
        <InfoText text="You can create new genres, keys, status etc. on the fly - the corrosponding dropdown in the track form will get populated."/>
      </div>
    </div>
  )
}
