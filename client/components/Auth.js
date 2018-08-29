import React from 'react';
import { firebase } from '../utils/firebase';


const Auth = (Component) => {
    class Auth extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
            });
        }

        render() {
            return (
                <Component/>
            )
        }
    }
};

export default Auth