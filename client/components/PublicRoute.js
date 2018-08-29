import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessageActions';


export default function(Component) {
    class PublicRoute extends React.Component {
        componentWillMount() {
            if ( this.props.isAuthenticated ) {
                this.props.push('/');
                this.props.addFlashMessage({
                    color: 'green',
                    icon: 'check',
                    message: 'You are already logged in'
                });
            }
        }

        render() {
            return (
                <Component {...this.props} />
            )
        }
    }

    PublicRoute.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        push: PropTypes.func.isRequired
    };

    function initMapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(initMapStateToProps, { push, addFlashMessage })(PublicRoute)
}