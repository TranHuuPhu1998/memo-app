import * as Types from '../constants/ActionTypes';

var initialState = [];
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.USER_LOGIN:
            state = action.payload.datalogin
            return [...state];
        case Types.RESGINTRATION:
            // state = state.push(action.data)
            return [...state]
        default:
            return state;
    }
};

export default myReducer;
