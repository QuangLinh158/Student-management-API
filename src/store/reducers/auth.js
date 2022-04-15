import ActionTypes from "../actions";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn') || false),
    token: localStorage.getItem('token'),
    currentUser: JSON.parse(localStorage.getItem('userInfo')) || {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            localStorage.setItem('token', action.token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(action.currentUser));
            return {
                ...state,
                isLoggedIn:true,
                token: action.token,
                currentUser:action.currentUser,
            };
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            return {
                ...state,
                isLoggedIn:false,
                token: null,
                currentUser: {},
            };
        default:
            return {...state};
    }
};

export default authReducer;
