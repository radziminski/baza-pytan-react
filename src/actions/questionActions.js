import { FETCH_QUESTIONS, NEW_QUESTION, DELETE_QUESTION, QUESTION_ERROR } from './types';
import { database } from '../firebase';
import { returnErrors } from '../actions/errorActions';

export const fetchQuestions = () => dispatch => {
    database
        .ref('questionsPublic')
        .once('value')
        .then(data => data.val())
        .then(questions => {
            console.log(questions);
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

export const createQuestion = question => dispatch => {
    const newQuestionRef = database.ref('questions').push();
    newQuestionRef
        .set({
            question: question.question,
            answer: question.answer,
            keyWords: question.keyWords
        })
        .then(data => {
            const newQuestion = { ...question };
            newQuestion.id = newQuestionRef.key;
            dispatch({
                type: NEW_QUESTION,
                payload: newQuestion
            });
        })
        .catch(err => {
            window.alert('Nie udało się wysłać pytania. Error: ' + err);
        });
};

export const deleteQuestion = id => dispatch => {
    database.ref(`questions/${id}`).remove(data => {
        dispatch({
            type: DELETE_QUESTION,
            payload: id
        });
    });
};
