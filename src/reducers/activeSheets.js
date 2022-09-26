const sheetReducer = (state = false, action) => {
  switch(action.type){
    case 'ACTIVE_SHEET':
      return !state;
    default:
      return state;
  }
}

export default sheetReducer;