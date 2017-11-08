import { combineReducers } from 'redux';
import ProjectReducer from './reducer_active_project';
import UserReducer from './reducer_current_user';

const rootReducer = combineReducers({
  activeProject: ProjectReducer,
  currentUser: UserReducer
})

export default rootReducer;
