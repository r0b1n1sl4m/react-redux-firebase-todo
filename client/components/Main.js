import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import IndexPage from './IndexPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

class Main extends React.Component {
    render() {
        return (
            <section id='main'>
                <Switch>
                    <Route exact path='/(|completed)' component={PrivateRoute(IndexPage)} />
                    <Route exact path='/signup' component={PublicRoute(SignUpPage)} />
                    <Route exact path='/login' component={PublicRoute(LoginPage)} />
                </Switch>
            </section>
        )
    }
}

export default Main