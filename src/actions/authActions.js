import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    PUBLISHER_FAIL,
    ADMIN_LOADED,
    PUBLISHER_LOADED
} from './types';
import { auth, database } from '../firebase';
import { returnErrors } from './errorActions';
import { backendFunctions } from '../firebase';

// Load User
export const loadUser = user => dispatch => {
    const user = auth.currentUser;

    if (user) {
        user.getIdTokenResult()
            .then(idTokenResult => {
                console.log('CLAIMS: ', idTokenResult.claims);
                if (idTokenResult.claims.admin)
                    dispatch({
                        type: ADMIN_LOADED
                    });
                else if (idTokenResult.claims.publisher) {
                    dispatch({
                        type: PUBLISHER_LOADED
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: PUBLISHER_FAIL
                });
            });
        database
            .ref(`users/${user.uid}`)
            .once('value')
            .then(data => data.val())
            .then(userData => {
                console.log(userData);
                if (!userData) throw new Error('User is not defined in database');
                user.firstName = userData.firstName || 'brak informacji';
                user.lastName = userData.lastName || 'brak informacji';
                user.city = userData.city || 'brak informacji';
                console.log(user);
                dispatch({
                    type: USER_LOADED,
                    payload: user
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.message, err.code));
                user.firstName = 'brak informacji';
                user.lastName = 'brak informacji';
                user.city = 'brak informacji';
                dispatch({
                    type: USER_LOADED,
                    payload: user
                });
            });
    } else
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

export const registerUser = userData => dispatch => {
    auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then(cred => cred.user)
        .then(user => {
            database.ref(`users/${user.uid}`).set({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: user.email,
                city: userData.city,
                isPublisher: false,
                isAdmin: false
            });
            dispatch({ type: REGISTER_SUCCESS });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({ type: REGISTER_FAIL });
        });
};

export const addPublisher = (email, uid) => dispatch => {
    console.log('adding');
    backendFunctions
        .httpsCallable('addPublisherRole')({ email })
        .then(() => {
            database
                .ref(`users/${uid}`)
                .update({ isPublisher: true })
                .catch(err => {
                    dispatch(returnErrors(err.message, err.code));
                });
            console.log('added');
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
        });
};

export const removePublisher = (email, uid) => dispatch => {
    backendFunctions
        .httpsCallable('removePublisherRole')({ email })
        .then(() => {
            database
                .ref(`users/${uid}`)
                .update({ isPublisher: false })
                .catch(err => {
                    dispatch(returnErrors(err.message, err.code));
                });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
        });
};

export const addAdmin = (email, uid) => dispatch => {
    console.log('adding admin');
    backendFunctions
        .httpsCallable('addAdminRole')({ email })
        .then(() => {
            database
                .ref(`users/${uid}`)
                .update({ isAdmin: true })
                .catch(err => {
                    dispatch(returnErrors(err.message, err.code));
                });
            console.log('added admin');
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
        });
};

export const removeAdmin = (email, uid) => dispatch => {
    backendFunctions
        .httpsCallable('removeAdminRole')({ email })
        .then(() => {
            database
                .ref(`users/${uid}`)
                .update({ isAdmin: false })
                .catch(err => {
                    dispatch(returnErrors(err.message, err.code));
                });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
        });
};
