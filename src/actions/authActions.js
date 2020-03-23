import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import { auth } from '../firebase';
import { returnErrors } from './errorActions';

// Load User
export const loadUser = user => dispatch => {
    const user = auth.currentUser;
    if (user)
        dispatch({
            type: USER_LOADED,
            payload: user
        });
    else
        dispatch({
            type: AUTH_ERROR
        });
};

export const loginUser = (email, password) => dispatch => {
    dispatch({
        type: USER_LOADING
    });
    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log(cred);
            dispatch({
                type: LOGIN_SUCCESS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({ type: LOGIN_FAIL });
        });
};

export const logOut = () => dispatch => {
    auth.signOut()
        .then(() => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({ type: AUTH_ERROR });
        });
};

export const registerUser = user => dispatch => {
    auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(cred => {
            console.log(cred);
            dispatch({
                type: REGISTER_SUCCESS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({ type: REGISTER_FAIL });
        });
};
