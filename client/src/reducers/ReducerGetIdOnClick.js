import * as Types from "../constants/ActionTypes";

const initialState = -1;

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ON_CLICK_NODE_MEMO:
            state = action.idClick;
            return state;
        default:
            return state;
    }
};

export default myReducer;
