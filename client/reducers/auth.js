import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from "../actions/action_types";


const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        default: return state;
    }
}