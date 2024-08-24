// store.js
import { configureStore } from "@reduxjs/toolkit";
import darkReducer from '../Redux/Reducer/darkLightModeSlice'
import activeReducer from '../Redux/Reducer/activateMenuSlice'
import alertReducer from'../Redux/Reducer/alertSlice'
import filterReducer from "../Redux/Reducer/filterSlice";
import reportLabelReducer from "../Redux/Reducer/labelModelSlice";
import menuDatasReducer from "./Reducer/menuDatasImageSlice";
import arabicAlignMentReducer from "./Reducer/arabicRightToLeftSlice";
import chequeReducer from "./Reducer/chequeDataSlice";
import submenuLabelReducer from "./Reducer/subMenuLabelSlice"

export const store = configureStore({
  reducer: {
    darkMode: darkReducer,
    selectMenu:activeReducer,
    alertBox:alertReducer,
    Filternames:filterReducer,
    reportMenuLAbel:reportLabelReducer,
    arabicAlignMent:arabicAlignMentReducer,
    menuDataImages:menuDatasReducer,
    getchequedata:chequeReducer,
    getsubmenulabel:submenuLabelReducer,

  }
});
