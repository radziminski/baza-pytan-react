import {
    FETCH_QUESTIONS,
    NEW_PRIVATE_QUESTION,
    NEW_PUBLIC_QUESTION,
    DELETE_QUESTION,
    UPDATE_QUESTION,
    QUESTIONS_LOADING
} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    isFetching: false
};

export default function(state = initialState, action) {
    let newItems = [...state.items];
    switch (action.type) {
        case QUESTIONS_LOADING:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_QUESTIONS:
            return {
                ...state,
                items: action.payload,
                isFetching: false
            };
        case NEW_PRIVATE_QUESTION:
            newItems.push(action.payload);
            return {
                ...state,
                items: newItems,
                item: action.payload,
                isFetching: false
            };
        case NEW_PUBLIC_QUESTION:
            if (!action.payload) return state;
            newItems.push(action.payload);
            return {
                ...state,
                items: newItems,
                item: action.payload,
                isFetching: false
            };
        case DELETE_QUESTION:
            newItems = newItems.filter(el => el.id !== action.payload);
            return {
                ...state,
                items: newItems,
                isFetching: false
            };
        case UPDATE_QUESTION:
            let newItemIndex = newItems.findIndex(el => el.id === action.payload.id);
            newItems[newItemIndex] = {
                ...newItems[newItemIndex],
                ...action.payload.question
            };
            return {
                ...state,
                items: newItems,
                item: newItems[newItemIndex],
                isFetching: false
            };
        default:
            return state;
    }
}
