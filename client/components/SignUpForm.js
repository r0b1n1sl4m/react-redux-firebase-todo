import React from 'react';
import { Segment, Label, Input } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { signUp, sendEmailVerification } from "../actions/authActions";
import { addFlashMessage, emptyFlashMessages } from "../actions/flashMessageActions";


class SignUpForm extends React.Component {
    state = {
        loading: false,
        email: '',
        password: ''
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.prop.emptyFlashMessages();
        this.setState({ loading: true });

        const { email, password } = this.state;
        this.props.signUp(email, password).then(
            (res) => this.props.sendEmailVerification(res.user),
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
                <Form id='signUpForm' noValidate onValidSubmit={this.handleSubmit} loading={loading}>
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
                        required
                        validations={{
                            minLength: 6
                        }}
                        validationErrors={{
                            isDefaultRequiredValue: 'Password is Required',
                            minLength: 'Password should be at least 6 characters'
                        }}
                        errorLabel={ errorLabel }
                        onChange={this.handleChange}
                    />
                    <Form.Button content='Sign Up' color='blue' fluid />
                </Form>
            </Segment>
        )
    }
}

SignUpForm.propTypes = {
    signUp: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    emptyFlashMessages: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
};

export default connect(null, { signUp, addFlashMessage, emptyFlashMessages, push, sendEmailVerification })(SignUpForm)