import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-semantic-ui-react';
import { Input, Label } from "semantic-ui-react";



class TodoForm extends React.Component {
    state = {
        loading: false,
        todoTitle: ''
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const newTodoTitle = this.state.todoTitle;
        const { addFlashMessage, emptyFlashMessages } = this.props;

        emptyFlashMessages();
        this.setState({loading: true});

        this.props.addTodo(newTodoTitle, (error) => {
            if ( error )
                addFlashMessage({ color: 'red', icon: 'exclamation', message: error.message });
            else
                this.refs.todoForm.reset();

            this.setState({loading: false});
        });
    };

    render() {
        const { todoTitle } = this.state;
        const errorLabel = <Label color='red' pointing />;

        return (
            <Form id='todoForm' ref='todoForm' onValidSubmit={this.handleSubmit}>
                <Form.Input
                    type='text'
                    name='todoTitle'
                    value={todoTitle}
                    placeholder='Type and press enter to add new todo'
                    size='large'
                    icon='pencil alternate'
                    iconPosition='left'
                    instantValidation={false}
                    inputAs={Input}
                    required
                    validationErrors={{
                        isDefaultRequiredValue: 'Type something that needs to be done',
                    }}
                    errorLabel={ errorLabel }
                    onChange={this.handleChange}
                    loading={this.state.loading}
                    disabled={this.state.loading}
                />
            </Form>
        )
    }
}

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    emptyFlashMessages: PropTypes.func.isRequired,
};

export default TodoForm