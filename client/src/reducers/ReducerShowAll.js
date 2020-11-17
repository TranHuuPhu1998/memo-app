import * as Types from "../constants/ActionTypes";

const initialState = {};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SHOW_ALL_NODE:
            return {
                statusShowALl: "showall"
            };
        case Types.SEARCH:
            return {
                statusSearch: "search",
                keyword: action.payload.data
            };
        case Types.CLIP_ALL:
            return {
                statusClip: "showClip"
            };
        case Types.SHOW_CATEGORY:
            return {
                statusCategory: "showCategory",
                nameCategory: action.payload.data
            };
        case Types.SHOW_HISTORY_DELETE:
            return {
                statusHistory: "showHistory"
            };
        default:
            return state;
    }
};

export default myReducer;
