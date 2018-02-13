import { combineReducers } from 'redux';

import ProjectReducer from './project_reducer';
import ProjectsReducer from './reducer_projects';
import UploadProgressReducer from './progress_reducer';
import UserReducer from './reducer_current_user';
import GenresReducer from './genres_reducer';
import KeysReducer from './keys_reducer';
import StatusReducer from './status_reducer';
import TrackReducer from './mediaPlayerReducer';

const rootReducer = combineReducers({
  activeProject: ProjectReducer,
  activeTrack: TrackReducer,
  currentUser: UserReducer,
  genres: GenresReducer,
  keys: KeysReducer,
  projects: ProjectsReducer,
  uploadProgress: UploadProgressReducer,
  statusList: StatusReducer
})

export default rootReducer;
