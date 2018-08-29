import { ADD_TODO } from "../actions/action_types";
import {
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    GET_TODOS_FAILED,
    EMPTY_TODO_LIST
} from "../actions/action_types";


const initialState = {
    fetching: false,
    todos: {}
};
export default function(state = initialState, action = {}) {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {...state, fetching: true};
        case GET_TODOS_SUCCESS:
            return {...state, fetching: false, todos: action.payload};
        case GET_TODOS_FAILED:
            return {...state, fetching: false, errors: action.payload};
        case EMPTY_TODO_LIST:
            return {...state, fetching: false, errors: [], todos: {}};
        default:
            return state;
    }
}