import docReducer from "./activeDoc";
import sheetReducer from "./activeSheets";
import  docIdReducer  from "./docId";
import sheetsIdReducer from "./sheetsId";

import { combineReducers } from "redux";
import toggleChatReducer from "./toggleChatReducer";
import cidReducer from "./cid";

const allReducers = combineReducers({
  isDoc:docReducer,
  isSheets:sheetReducer,
  docId: docIdReducer,
  sheetsId:sheetsIdReducer,
  toggleChat:toggleChatReducer,
  cid:cidReducer
  
})

export default allReducers;