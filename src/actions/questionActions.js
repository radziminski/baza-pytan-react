import {
    FETCH_QUESTIONS,
    NEW_PRIVATE_QUESTION,
    DELETE_QUESTION,
    QUESTION_ERROR,
    NEW_PUBLIC_QUESTION,
    UPDATE_QUESTION,
    QUESTIONS_FETCHING
} from './types';
import { database } from '../firebase';
import { returnErrors } from '../actions/errorActions';

export const fetchPublicQuestions = () => dispatch => {
    dispatch({
        type: QUESTIONS_FETCHING
    });
    database
        .ref('publicQuestions')
        .once('value')
        .then(data => data.val())
        .then(questions => {
            console.log('PUBLIC:', questions);
            const newQuestions = [];
            for (let question in questions) {
                newQuestions.push({
                    ...questions[question],
                    id: question,
                    isDeletable: false
                });
            }
            dispatch({
                type: FETCH_QUESTIONS,
                payload: newQuestions
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({
                type: QUESTION_ERROR
            });
        });
};

export const fetchMyReviewQuestions = uid => dispatch => {
    console.log('GETTING Q FROM: ', uid);
    dispatch({
        type: QUESTIONS_FETCHING
    });
    if (!uid) {
        console.error('Getting questions without beeing authenticated!');
        return;
    }
    database
        .ref('reviewQuestions')
        .orderByChild('uid')
        .equalTo(uid)
        .once('value')
        .then(data => data.val())
        .then(questions => {
            console.log(questions);
            const newQuestions = [];
            for (let question in questions) {
                newQuestions.push({
                    ...questions[question],
                    id: question,
                    isDeletable: true
                });
            }
            dispatch({
                type: FETCH_QUESTIONS,
                payload: newQuestions
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({
                type: QUESTION_ERROR
            });
        });
};

export const fetchAllReviewQuestions = () => dispatch => {
    dispatch({
        type: QUESTIONS_FETCHING
    });

    database
        .ref('reviewQuestions')
        .once('value')
        .then(data => data.val())
        .then(questions => {
            console.log(questions);
            const newQuestions = [];
            for (let question in questions) {
                newQuestions.push({
                    ...questions[question],
                    id: question,
                    isDeletable: true
                });
            }
            dispatch({
                type: FETCH_QUESTIONS,
                payload: newQuestions
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({
                type: QUESTION_ERROR
            });
        });
};

export const createReviewQuestion = (question, user) => dispatch => {
    console.log('SENDER', user);
    const newQuestionRef = database.ref('reviewQuestions').push();
    newQuestionRef
        .set({
            question: question.question,
            answer: question.answer,
            keyWords: question.keyWords || [],
            uid: user.uid,
            creator: {
                firstName: user.firstName || 'Brak informacji',
                lastName: user.lastName || 'Brak informacji',
                email: user.email || 'Nie podano'
            },
            createdAt: Date.now()
        })
        .then(data => {
            const newQuestion = { ...question };
            newQuestion.id = newQuestionRef.key;
            dispatch({
                type: NEW_PRIVATE_QUESTION,
                payload: newQuestion
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({
                type: QUESTION_ERROR
            });
        });
};

export const createPublicQuestion = (question, user) => dispatch => {
    console.log('SENDER', user);
    if (!question.id) console.error('CANT MAKE QUESTION PUBLIC WITHOUT ITS ID');
    const newQuestionRef = database.ref('publicQuestions').push();
    newQuestionRef
        .set({
            question: question.question,
            answer: question.answer,
            keyWords: question.keyWords || [],
            uid: user.uid || 'brak danych',
            author: question.uid || 'brak danych',
            createdAt: Date.now()
        })
        .then(data => {
            const newQuestion = { ...question };
            newQuestion.id = newQuestionRef.key;
            dispatch({
                type: NEW_PUBLIC_QUESTION,
                payload: newQuestion
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({
                type: QUESTION_ERROR
            });
        });
};

export const deleteQuestion = (id, databaseName) => dispatch => {
    database
        .ref(`${databaseName}/${id}`)
        .remove(data => {
            dispatch({
                type: DELETE_QUESTION,
                payload: id
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({
                type: QUESTION_ERROR
            });
        });
};

export const updateQuestion = (id, databaseName, dataToUpdate) => dispatch => {
    database
        .ref(`${databaseName}/${id}`)
        .update({
            ...dataToUpdate
        })
        .then(() => {
            dispatch({
                type: UPDATE_QUESTION,
                payload: {
                    id,
                    question: dataToUpdate
                }
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.message, err.code));
            dispatch({
                type: QUESTION_ERROR
            });
        });
};
