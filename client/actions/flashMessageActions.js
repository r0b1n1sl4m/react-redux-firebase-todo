import { ADD_FLASH_MESSAGE } from './action_types';
import { REMOVE_FLASH_MESSAGE } from './action_types';
import { EMPTY_FLASH_MESSAGES } from './action_types';


export function addFlashMessage(message) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}

export function removeFlashMessage(id) {
    return {
        type: REMOVE_FLASH_MESSAGE,
        id: id
    }
}

export function emptyFlashMessages() {
    return {
        type: EMPTY_FLASH_MESSAGES
    }
}