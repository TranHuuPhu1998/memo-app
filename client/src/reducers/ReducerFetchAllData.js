import * as Types from "../constants/ActionTypes";
import moment from "moment";
const initialState = [];
var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task._id === id) {
            result = index;
        }
    });
    return result;
};

const myReducer = (state = initialState, action) => {
    var index = -1;
    var today = moment(new Date());
    switch (action.type) {
        case Types.FETCH_ALL_DATA_MEMO:
            state = action.dataFetch;
            return [...state];
        case Types.ADD_NODE_ON_MEMO:
            let task = {
                categoryDate:
                    action.dataAdd.categoryDate === null
                        ? (action.dataAdd.categoryDate = today.format(
                            "YYYY/MM/DD"
                        ))
                        : moment(action.dataAdd.categoryDate).format("YYYY/MM/DD"),
                categoryName: action.dataAdd.categoryName,
                titleMemo: action.dataAdd.titleMemo,
                contentMemo: action.dataAdd.contentMemo,
                id: action.dataAdd._id,
                clip: action.dataAdd.clip
            };
            state.push(task);
            return [...state];
        case Types.DELETE_NODE:

            index = findIndex(state, action.id);

            state.splice(index, 1);

            return [...state];
        case Types.UPDATE_NODE:
            action.data.categoryDate = today.format("YYYY/MM/DD")
            index = findIndex(state, action.data._id);
            state[index] = action.data;
            return [...state];
        case Types.CLIP_NODE:
            index = findIndex(state, action.dataclip.id);
            state[index] = action.dataclip;
            return [...state];
        default:
            return state;
    }
};

export default myReducer;
