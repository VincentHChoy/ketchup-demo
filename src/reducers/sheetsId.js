const sheetsIdReducer = (state = '', action) => {
  switch(action.type){
    case 'SHEETS_ID':
      return state + action.payload;
    default:
      return state;
  }
}

export default sheetsIdReducer;