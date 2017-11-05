import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';
import ActiveProject from './reducer_active_project';

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  activeProject: ActiveProject
})

export default rootReducer;
