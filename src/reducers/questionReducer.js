import { FETCH_QUESTIONS, NEW_QUESTION, DELETE_QUESTION } from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    let newItems = [...state.items];
    switch (action.type) {
        case FETCH_QUESTIONS:
            return {
                ...state,
                items: action.payload
            };
        case NEW_QUESTION:
            newItems.push(action.payload);
            return {
                ...state,
                items: newItems,
                item: action.payload
            };
        case DELETE_QUESTION:
            newItems = newItems.filter(el => el.id !== action.payload);
            return {
                ...state,
                items: newItems
            };
        default:
            return state;
    }
}
