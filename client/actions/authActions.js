import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import shortId from 'shortid';
import auth from '../utils/auth';
import database from '../utils/database';
import {EMPTY_TODO_LIST, SET_CURRENT_USER} from './action_types';
import { addFlashMessage } from "./flashMessageActions";


export function setCurrentUser(user) {
    return dispatch => {
        if ( !isEmpty( user ) ) {
            // Add user info in localStorage
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_email', user.email);
        } else {
            // Remove user info from localStorage
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_email');

            // Remove user data from redux store
            dispatch({
                type: EMPTY_TODO_LIST
            });
        }

        dispatch({
            type: SET_CURRENT_USER,
            user
        });
    }
}

export function login(email, password) {
    return dispatch => {
        return auth.signInWithEmailAndPassword(email, password);
    }
}

export function signUp(email, password) {
    return dispatch => {
        return auth.createUserWithEmailAndPassword(email, password);
    }
}

export function logout() {
    return dispatch => {
        return auth.signOut();
    }
}

export function sendPasswordResetEmail(email) {
    return dispatch => {
        return auth.sendPasswordResetEmail(email);
    }
}

export function addUserInitialData(userId, userEmail) {
    return dispatch => {
        // Add initial data if doesn't exists
        const usersRef = database.ref('users');

        usersRef.child(userId).once('value', snapshot => {
            if ( !snapshot.val() ) {
                const todoId = shortId.generate();
                const currentDateTime = moment().format('DD-MM-YYYY hh:mma');

                const initalInfo = {
                    email: userEmail,
                    todos: {}
                };
                initalInfo['todos'][todoId] = {title: 'Add your first todo', created_at: currentDateTime};

                usersRef.child(userId).set(initalInfo);
            }
        });
    }
}

export function throughEmailVerificationAlert(action) {
    return dispatch => {
        let message = {};

        if ( action === 'signin') {
            message = {
                color: 'yellow',
                icon: 'exclamation',
                message: 'Please verify your email account to sign in'
            };
        } else {
            message = {
                color: 'green',
                icon: 'check',
                message: 'We have sent an email to verify your account'
            };
        }

        dispatch(addFlashMessage(message));
    }
}

export function sendEmailVerification(user) {
    return dispatch => {
        user.sendEmailVerification().catch(error => alert('Something went wrong while sending verification email'));
    }
}