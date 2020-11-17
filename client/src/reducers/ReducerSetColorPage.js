import * as Types from '../constants/ActionTypes';

var initialState = {color:""};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.SET_COLOR_PAGE:
            return {
                color : action.payload.color
            }
        default:
            return state;
    }
};

export default myReducer;
