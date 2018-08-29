import React from 'react';
import { Form } from 'formsy-semantic-ui-react';
import { Modal, Header, Button, Label, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { sendPasswordResetEmail } from "../actions/authActions";
import { addFlashMessage } from "../actions/flashMessageActions";


class ForgotPasswordModal extends React.Component {
    state = {
        modalOpen: false,
        loadingForm: false,
        email: ''
    };

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.setState({ loadingForm: true });

        this.props.sendPasswordResetEmail(this.state.email).then(
            () => {
                this.props.addFlashMessage({ color: 'green', icon: 'check', message: 'Password reset email has been sent successfully.'});

                this.setState({ loadingForm: false, modalOpen: false});
            },
            (error) => {
                this.props.addFlashMessage({ color: 'red', icon: 'exclamation', message: error.message });

                this.setState({ loadingForm: false, modalOpen: false});
            }
        );

    };

    render() {
        const { trigger } = this.props;
        const { modalOpen, loadingForm } = this.state;
        const errorLabel = <Label color='red' pointing />;

        return (
            <Modal trigger={React.cloneElement(trigger, { onClick: this.handleOpen })} open={modalOpen} onClose={this.handleClose} basic size='tiny'>
                <Header icon='key' content='Request Password Reset E-mail' />
                <Modal.Content>
                    <Form  id='forgotPasswordForm' noValidate>
                        <Form.Input
                            type='email'
                            name='email'
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
                            disabled={loadingForm}
                            loading={loadingForm}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button color='green' inverted onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

ForgotPasswordModal.propTypes = {
    trigger: PropTypes.element.isRequired,
    sendPasswordResetEmail: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
};

export default connect(null, { sendPasswordResetEmail, addFlashMessage, push })(ForgotPasswordModal)