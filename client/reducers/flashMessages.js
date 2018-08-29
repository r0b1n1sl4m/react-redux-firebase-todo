import shortid from 'shortid';
import { ADD_FLASH_MESSAGE } from "../actions/action_types";
import { REMOVE_FLASH_MESSAGE } from "../actions/action_types";
import { EMPTY_FLASH_MESSAGES } from "../actions/action_types";
import { LOCATION_CHANGE } from "../actions/action_types";


export default function(state = [], action = {}) {
    switch (action.type)  {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    color: action.message.color,
                    icon: action.message.icon,
                    message: action.message.message
                }
            ];
        case REMOVE_FLASH_MESSAGE:
            return state.filter((arr) => arr.id !== action.id);
        case LOCATION_CHANGE:
            return [];
        case EMPTY_FLASH_MESSAGES:
            return [];
        default: return state
    }
}