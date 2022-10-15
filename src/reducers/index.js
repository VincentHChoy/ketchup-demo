import { combineReducers } from "redux";

import docReducer from "./activeDoc";
import sheetReducer from "./activeSheets";
import  docIdReducer  from "./docId";
import sheetsIdReducer from "./sheetsId";
import toggleChatReducer from "./toggleChatReducer";
import cidReducer from "./cid";
import gidReducer from "./gid";


const allReducers = combineReducers({
  isDoc:docReducer,
  isSheets:sheetReducer,
  docId: docIdReducer,
  sheetsId:sheetsIdReducer,
  toggleChat:toggleChatReducer,
  cid:cidReducer,
  gid:gidReducer
  
})

export default allReducers;