import * as Types from '../constants/ActionTypes';

var getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
var set_cookie = (name, value) => {
    document.cookie = name + '=' + value + '; Path=/;';
}

var lang = getCookie("lang")
var InitialState = (lang && lang === 'vn') ? 'vn' : (lang === 'jp' ? 'jp' : 'en');
set_cookie("lang", InitialState)

const myReducer = (state = InitialState, action) => {
    switch (action.type) {
        case Types.CHANGE_LOCALE:
            state = action.lang === 'vn' ? 'vn' : (action.lang === 'jp' ? 'jp' : 'en');
            set_cookie("lang", state);
            return state;
        default:
            return state;
    }
};
export default myReducer;