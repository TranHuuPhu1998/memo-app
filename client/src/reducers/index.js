import { combineReducers } from "redux";
import fetchAllDataMemo from "./ReducerFetchAllData";
import getActiveMemo from "./ReducerGetIdOnClick";
import dataSavetamp from "./ReducerDataSavetam";
import editNote from "./ReducerEditNote";
import sortTask from "./ReducerSortTitle";
import showallnote from "./ReducerShowAll";
import dataUser from "./ReducerUserLogin";
import color from "./ReducerSetColorPage";
import locale from "./ReducerLocale";
import history from './ReducerHistoryDelete';
import categorynew from './ReducerAddCategory';
import categoryget from './ReducerGetCategory';
import categoryuinew from './ReducerUiNewCategory';
const appReducers = combineReducers({
    categoryuinew,
    categoryget,
    categorynew,
    history,
    fetchAllDataMemo,
    getActiveMemo,
    dataSavetamp,
    editNote,
    sortTask,
    showallnote,
    dataUser,
    color,
    locale
});

export default appReducers;
