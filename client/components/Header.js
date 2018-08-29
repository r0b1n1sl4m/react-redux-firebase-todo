import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { Menu, Header as HeaderTag } from 'semantic-ui-react';
import { logout, setCurrentUser } from '../actions/authActions';


class Header extends React.Component {
    logout = () => {
        this.props.logout();
        this.props.setCurrentUser({});
        this.props.push('/login');
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        const { currentPath } = this.props;

        const userLinks = (
            <Menu.Menu position='right'>
                <Menu.Item name='logout'>
                    <a href='#' onClick={this.logout}>Logout</a>
                </Menu.Item>
            </Menu.Menu>
        );

        const guestLinks = (
            <Menu.Menu position='right'>
                <Menu.Item as={Link} to='/signup' name='signup' active={currentPath === '/signup'} onClick={this.handleItemClick}>
                    Sign Up
                </Menu.Item>

                <Menu.Item as={Link} to='/login' name='login' active={currentPath === '/login'} onClick={this.handleItemClick}>
                    Login
                </Menu.Item>
            </Menu.Menu>
        );

        return (
            <header id='header'>
                <Menu>
                    <Menu.Item as={Link} to='/' name='home' onClick={this.handleItemClick}>
                        <HeaderTag as='h1'>ReactRedux</HeaderTag>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {isAuthenticated ? userLinks : guestLinks}
                    </Menu.Menu>
                </Menu>
            </header>
        )
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    currentPath: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
};

function initMapStateToProps(state) {
    return {
        auth: state.auth,
        currentPath: state.router.location.pathname
    }
}

export default connect(initMapStateToProps, { logout, setCurrentUser, push })(Header)