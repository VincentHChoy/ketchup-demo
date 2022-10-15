const setGID = (state = null, action) => {
  switch (action.type) {
    case 'SET_GID':
      return action.payload;
    default:
      return state;
  }
}

export default setGID;