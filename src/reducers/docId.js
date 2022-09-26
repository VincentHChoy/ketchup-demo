const docIdReducer = (state = '', action) => {
  switch(action.type){
    case 'DOC_ID':
      return state + action.payload;
    default:
      return state;
  }
}

export default docIdReducer;