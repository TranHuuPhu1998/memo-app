import * as Types from "./../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import moment from "moment";

// fetch All Data
export const actFetchAllDataMemo = dataFetch => {
    return {
        type: Types.FETCH_ALL_DATA_MEMO,
        dataFetch
    };
};

export const actFetchAllDataMemoRequest = () => {
    return dispatch => {
        return callApi("dataMemo", "GET", null).then(res => {
            if (res.data) {
                dispatch(actFetchAllDataMemo(res.data));
            }
        });
    };
};
// add data for Memo
export const actAddNodeMemo = dataAdd => {
    return {
        type: Types.ADD_NODE_ON_MEMO,
        dataAdd
    };
};

export const actAddNodeMemoRequest = dataAdd => {
    let date;
    let date_rs;
    date = moment(dataAdd.categoryDate);
    date_rs = date.format("YYYY/MM/DD");
    dataAdd.categoryDate = date_rs;
    console.log(dataAdd.categoryDate);

    return dispatch => {
        return callApi("dataMemo", "POST", dataAdd).then(res => {
            if (dataAdd) {
                dispatch(actAddNodeMemo(dataAdd));
            }
        });
    };
};
// SHOW_HISTORY_DELETE
export const actAddHistoryMemo = data => {
    return {
        type: Types.HISTORY_DELETE,
        data
    };
};

export const acthistoryDeleteRequest = data => {
    return dispatch => {
        return callApi("htrdelete", "POST", data);
    };
};

export const actGethistoryDeleteRequest = data => {
    return dispatch => {
        return callApi("htrdelete", "GET", data).then(res => {
            if (res.data) {
                dispatch(actAddHistoryMemo(res.data));
            }
        });
    };
};

export const actShowHistoryMemo = data => {
    return {
        type: Types.SHOW_HISTORY_DELETE,
        data
    };
};

// onClick note get id for all page

export const actOnCLickNode = idClick => {
    return {
        type: Types.ON_CLICK_NODE_MEMO,
        idClick
    };
};

// Data storage for memo

export const actSaveDatatoStore = dataSavetamp => {
    return {
        type: Types.SAVE_DATA_TO_STORE,
        dataSavetamp
    };
};

export const actEditNode = dataEdit => {
    return {
        type: Types.EDIT_NODE,
        dataEdit
    };
};

//delete

export const actDeleteNodeRequest = id => {
    console.log(id);

    return dispatch => {
        return callApi(`dataMemo/${id}`, "DELETE", null).then(res => {
            dispatch(actDeleteNode(id));
        });
    };
};

export const actDeleteNode = id => {
    return {
        type: Types.DELETE_NODE,
        id
    };
};

///update
export const actUpdateNodeRequest = data => {
    console.log(data);

    return dispatch => {
        return callApi(`dataMemo/${data._id}`, "PUT", data).then(res => {
            dispatch(actUpdateNode(data));
        });
    };
};

export const actUpdateNode = data => {
    return {
        type: Types.UPDATE_NODE,
        data
    };
};

//clip

export const actUpdateClipNode = dataclip => {
    return {
        type: Types.CLIP_NODE,
        dataclip
    };
};

export const actUpdateClipNodeRequest = data => {
    return dispatch => {
        console.log(data);

        return callApi(`dataMemo/${data._id}`, "PUT", data).then(res => {
            console.log(res.data);
            dispatch(actUpdateClipNode(res.data));
        });
    };
};
export const sortTask = sort => {
    return {
        type: Types.SORT,
        payload: {
            sort
        }
    };
};
export const searchTask = data => {
    return {
        type: Types.SEARCH,
        payload: {
            data
        }
    };
};

export const actShowAllNote = () => {
    return {
        type: Types.SHOW_ALL_NODE
    };
};

export const actUserLogin = datalogin => {
    return {
        type: Types.USER_LOGIN,
        payload: {
            datalogin
        }
    };
};

export const actFetchAllDataUserLoginRequest = data => {
    return dispatch => {
        return callApi("user", "GET", null).then(res => {
            if (res.data) {
                dispatch(actUserLogin(res.data));
            }
        });
    };
};

export const actShowAllClip = () => {
    return {
        type: Types.CLIP_ALL
    };
};

export const actShowCategory = data => {
    console.log(data);

    return {
        type: Types.SHOW_CATEGORY,
        payload: {
            data
        }
    };
};

//set color

export const actSetColorPage = color => {
    console.log(color);

    return {
        type: Types.SET_COLOR_PAGE,
        payload: {
            color
        }
    };
};
//MULTI LANGUAGE
export const changeLocale = lang => {
    return {
        type: Types.CHANGE_LOCALE,
        lang
    };
};

export const actResgintration = data => {
    return {
        type: Types.RESGINTRATION,
        data
    };
};
export const actResgintrationRequest = data => {
    console.log(data);
    return dispatch => {
        return callApi("user", "POST", data).then(res => {
            dispatch(actResgintration(res.data));
        });
    };

};
/*--NEW CATEGORY */

export const actNewCategoryUI = data => {
    return {
        type: Types.OPEN_CLOES_UI_NEWCATEGORY,
        payload: {
            data
        }
    };
};


export const actNewCategory = data => {
    return {
        type: Types.NEW_CATEGORY,
        data
    };
};

export const actAddCategory = data => {
    return {
        type: Types.ADD_CATEGORY,
        data
    };
};

export const actNewCategoryRequest = data => {
    return dispatch => {
        return callApi("category", "POST", data).then(res => {
            if (res.data) {
                dispatch(actAddCategory(res.data));
            }

        })
    };

};

export const actGetCategory = data => {
    return {
        type: Types.GET_CATEGORY,
        data
    };
};

export const actGetCategoryRequest = () => {
    return dispatch => {
        return callApi("category", "GET", null).then(res => {
            if (res.data) {
                dispatch(actGetCategory(res.data));
            }
        });
    };
};