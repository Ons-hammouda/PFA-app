// actions.js

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});


export const logout = () => ({
    type: 'LOGOUT',
});
const initialState = {
    email: null,
    first_name: null,
    last_name: null,

    role_id: null,
    user_id: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                email: null,
                name: null,
                role_id: null,
                user_id: null,
                isAuthenticated: false,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                role_id: action.payload.role_id,
                user_id: action.payload.user_id,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};


export default authReducer;