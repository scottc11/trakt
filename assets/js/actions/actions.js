export function selectProject(project) {
  // selectProject is an actionCreator, it needs to return an action,
  // which is an object with a type property
  return {
    type: 'PROJECT_SELECTED',
    payload: project
  };
}
