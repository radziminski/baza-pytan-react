import {
    FETCH_QUESTIONS,
    NEW_PRIVATE_QUESTION,
    NEW_PUBLIC_QUESTION,
    DELETE_QUESTION,
    UPDATE_QUESTION,
    QUESTIONS_FETCHING
} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    isFetching: false
};

export default function(state = initialState, action) {
    let newItems = [...state.items];
    switch (action.type) {
        case QUESTIONS_FETCHING:
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
                item: action.payload
            };
        case NEW_PUBLIC_QUESTION:
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
        case UPDATE_QUESTION:
            let newItemIndex = newItems.findIndex(el => el.id === action.payload.id);
            newItems[newItemIndex] = {
                ...newItems[newItemIndex],
                ...action.payload.question
            };
            return {
                ...state,
                items: newItems,
                item: newItems[newItemIndex]
            };
        default:
            return state;
    }
}
