import {
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS
} from "./action_types";
import { getDbRef } from "../utils/database";
import moment from "moment";



export function fetchTodos(userId) {
    return dispatch => {
        const todosRef = getDbRef('todosRef');

        if ( todosRef ) {
            // Fire loading state action
            dispatch({
                type: GET_TODOS_REQUEST
            });

            todosRef.on('value', snapshot => {
                if ( snapshot.val() ) {
                    // Fire fetching success action
                    dispatch({
                        type: GET_TODOS_SUCCESS,
                        payload: snapshot.val()
                    });
                }
            });
        }
    };
}

export function addTodo(todoTitle, callback) {
    return dispatch => {
        const todosRef = getDbRef('todosRef');

        if ( todosRef ) {
            todosRef.push({
                title: todoTitle,
                created_at: moment().format('DD-MM-YYYY hh:mma')
            }, callback);
        }
    }
}

export function markAsComplete(key, callback) {
    return dispatch => {
        const todoRef = getDbRef('todosRef').child(key);

        if ( todoRef ) {
            todoRef.update({
                completed_at: moment().format('DD-MM-YYYY hh:mma')
            }, callback)
        }
    }
}

export function markAsInComplete(key, callback) {
    return dispatch => {
        const todoRef = getDbRef('todosRef').child(key);

        if ( todoRef ) {
            todoRef.update({
                completed_at: null
            }, callback)
        }
    }
}

export function deleteTodo(key, callback) {
    return dispatch => {
        const todoRef = getDbRef('todosRef').child(key);

        if ( todoRef ) {
            todoRef.remove(callback)
        }
    }
}
