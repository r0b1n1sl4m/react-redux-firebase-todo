import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Grid, Message } from 'semantic-ui-react';
import FlashMessagesList from './FlashMessagesList';
import SignUpForm from './SignUpForm';


class SignUpPage extends React.Component {
    render() {
        return (
            <div id='signUpPage'>
                <Header as='h2' className='pageTitle'>Create A New Account</Header>
                <Grid centered>
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <FlashMessagesList/>
                        <SignUpForm/>
                        <Message align='center'>
                            Already Have An Account? <Link to='/login'>Login</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignUpPage