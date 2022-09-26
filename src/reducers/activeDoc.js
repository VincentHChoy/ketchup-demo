const docReducer = (state = false, action) => {
  switch(action.type){
    case 'ACTIVE_DOC':
      return !state;
    default:
    return state;
  }
}

export default docReducer;