const toggleChatReducer = (state = false, action) => {
  switch(action.type){
    case 'TOGGLE_CHAT':
      return !state;
    default:
      return state;
  }
}

export default toggleChatReducer;