import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessageActions';


export default function(Component) {
    class ProtectedRoute extends React.Component {
        componentWillMount() {
            if ( !this.props.isAuthenticated ) {
                this.props.push('/login');
                this.props.addFlashMessage({
                    color: 'red',
                    icon: 'exclamation',
                    message: 'You must log in to access the admin area'
                });
            }
        }

        render() {
            return (
                <Component {...this.props} />
            )
        }
    }

    ProtectedRoute.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        push: PropTypes.func.isRequired
    };

    function initMapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(initMapStateToProps, { push, addFlashMessage })(ProtectedRoute)
}