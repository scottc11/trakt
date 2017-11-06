import { combineReducers } from 'redux';
import ActiveProject from './reducer_active_project';

const rootReducer = combineReducers({
  activeProject: ActiveProject
})

export default rootReducer;
