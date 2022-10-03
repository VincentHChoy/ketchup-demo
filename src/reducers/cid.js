const cidReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_CID':
      return action.payload;
    default:
      return state;
  }
}

export default cidReducer;