import docReducer from "./activeDoc";
import sheetReducer from "./activeSheets";
import  docIdReducer  from "./docId";
import sheetsIdReducer from "./sheetsId";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isDoc:docReducer,
  isSheets:sheetReducer,
  docId: docIdReducer,
  sheetsId:sheetsIdReducer
})

export default allReducers;