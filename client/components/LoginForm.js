import React from 'react';
import { Segment, Label, Input, Container } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import ForgotPasswordModal from "./ForgotPasswordModal";
import { login} from "../actions/authActions";
import { addFlashMessage, emptyFlashMessages } from "../actions/flashMessageActions";


class LoginForm extends React.Component {
    state = {
        loading: false,
        email: '',
        password: ''
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.props.emptyFlashMessages();
        this.setState({ loading: true });

        const { email, password } = this.state;
        this.props.login(email, password).then(
            (res) => {
                if ( !res.user.emailVerified )
                    this.setState({ loading: false });
            },
            (error) => {
                this.props.addFlashMessage({ color: 'red', icon: 'exclamation', message: error.message });
                this.setState({ loading: false });
            }
        );
    };

    render() {
        const { loading, email, password } = this.state;
        const errorLabel = <Label color='red' pointing />;

        return (
            <Segment stacked>
                <Form id='loginForm' noValidate onValidSubmit={this.handleSubmit} loading={loading}>
                    <Form.Input
                        type='email'
                        name='email'
                        value={email}
                        placeholder='E-mail Address...'
                        icon='user'
                        iconPosition='left'
                        inputAs={Input}
                        required
                        validations='isEmail'
                        validationErrors={{
                            isEmail: 'This is not a valid email',
                            isDefaultRequiredValue: 'Email is Required',
                        }}
                        errorLabel={ errorLabel }
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        icon='key'
                        iconPosition='left'
                        inputAs={Input}
                        className='loginFormPasswordField'
                        required
                        validationErrors={{
                            isDefaultRequiredValue: 'Password is Required',
                        }}
                        errorLabel={ errorLabel }
                        onChange={this.handleChange}
                    />
                    <Container textAlign='right' className='m-t-5 m-b-15'>
                        <ForgotPasswordModal trigger={<span className='forgotModalTrigger'>Forgot Password?</span>} />
                    </Container>
                    <Form.Button content='Login' color='blue' fluid />
                </Form>
            </Segment>
        )
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    emptyFlashMessages: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
};

export default connect(null, { login, addFlashMessage, emptyFlashMessages, push })(LoginForm)