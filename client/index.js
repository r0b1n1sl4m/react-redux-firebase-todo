import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware, ConnectedRouter, push } from 'connected-react-router';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import auth from './utils/auth';
import rootReducer from './reducers';
import App from './components/App';
import {
    setCurrentUser,
    addUserInitialData,
    throughEmailVerificationAlert,
    logout
} from './actions/authActions';
import {
    fetchTodos
} from './actions/todoListsActions'
import { buildDbRefs, destroyDbRefs } from "./utils/database";


const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(rootReducer),
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
    applyMiddleware(routerMiddleware(history), thunk)
);

// Check & update authentication status
const userId = localStorage.getItem('user_id');
const userEmail = localStorage.getItem('user_email');

if ( userId ) {
    store.dispatch(setCurrentUser({
        id: userId,
        email: userEmail
    }));
}

auth.onAuthStateChanged(user => {
    const current_path = store.getState().router.location.pathname;

    if ( user ) {
        // Initial data check
        store.dispatch(addUserInitialData(user.uid, user.email));

        if ( user.emailVerified ) {
            store.dispatch(setCurrentUser({
                id: user.uid,
                email: user.email
            }));

            // Build db refs
            buildDbRefs(user.uid);

            // Start fetching todos
            store.dispatch(fetchTodos());

            if ( current_path !== '/' )
                store.dispatch(push('/'));
        } else {
            store.dispatch(logout());

            // Through email verification alert on sign in attempt
            if ( current_path === '/login' )
                store.dispatch(throughEmailVerificationAlert('signin'));

            // Through email verification alert on sign up attempt
            if ( current_path === '/signup' ) {
                store.dispatch(push('/login'));
                store.dispatch(throughEmailVerificationAlert('signup'));
            }

        }
    } else {
        if (userId)
            // Destroy user db refs
            destroyDbRefs();

        store.dispatch(setCurrentUser({}));
    }
});

render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
), document.getElementById('app'));