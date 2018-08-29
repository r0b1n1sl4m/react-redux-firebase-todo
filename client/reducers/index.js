import { combineReducers } from  'redux';
import flashMessages from './flashMessages';
import auth from './auth';
import todoLists from './todoLists';


export default combineReducers({
    flashMessages,
    auth,
    todoLists
});