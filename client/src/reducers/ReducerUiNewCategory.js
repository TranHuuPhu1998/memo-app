import * as Types from '../constants/ActionTypes';

var initialState = {
    open : false
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.OPEN_CLOES_UI_NEWCATEGORY:
            return {
                open : action.payload.data
            };
        default:
            return {...state};
    }
};

export default myReducer;
