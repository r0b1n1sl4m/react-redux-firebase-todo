import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Grid, Message } from 'semantic-ui-react';
import FlashMessagesList from './FlashMessagesList';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
    render() {
        return (
            <div id='loginPage'>
                <Header as='h2' className='pageTitle'>Log-In To Your Account</Header>
                <Grid centered>
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <FlashMessagesList/>
                        <LoginForm/>
                        <Message align='center'>
                            New To Us? <Link to='/signup'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default LoginPage