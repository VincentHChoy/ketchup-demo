const sheetsIdReducer = (state = '', action) => {
  switch(action.type){
    case 'SHEETS_ID':
      return action.payload;
    default:
      return state;
  }
}

export default sheetsIdReducer;