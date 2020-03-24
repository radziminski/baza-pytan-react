import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ADMIN_FAIL,
    ADMIN_LOADED,
    PUBLISHER_FAIL,
    PUBLISHER_LOADED
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    isLoading: false,
    user: null,
    isAdmin: false,
    isPublisher: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuthenticated: false,
                isAdmin: false,
                isPublisher: false
            };
        case ADMIN_LOADED:
            return {
                ...state,
                isAdmin: true,
                isPublisher: true
            };
        case PUBLISHER_LOADED:
            return {
                ...state,
                isAdmin: false,
                isPublisher: true
            };
        case ADMIN_FAIL:
            return {
                ...state,
                isAdmin: false
            };
        case PUBLISHER_FAIL:
            return {
                ...state,
                isPublisher: false,
                isAdmin: false
            };
        default:
            return state;
    }
}
