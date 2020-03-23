import { combineReducers } from 'redux';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    questions: questionReducer,
    error: errorReducer
});
