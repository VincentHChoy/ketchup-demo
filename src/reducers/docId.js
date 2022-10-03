const docIdReducer = (state = null, action) => {
  switch(action.type){
    case 'DOC_ID':
      return action.payload;
    default:
      return state
  }
}

export default docIdReducer;