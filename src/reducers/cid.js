const cidReducer = (state = '', action) => {
  switch (action.type) {
    case 'CID':
      return state + action.payload;
    default:
      return state;
  }
}

export default cidReducer;