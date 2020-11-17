import * as Types from '../constants/ActionTypes';

var initialState = {
    value : 1, 
    sortby : "",
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.SORT:
            return {
                value : action.payload.sort.value,
                sortby : action.payload.sort.sortby
            };
        default:
            return state;
    }
};

export default myReducer;
