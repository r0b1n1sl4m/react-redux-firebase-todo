import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';


class Todo extends React.Component {
    markAsComplete = () => {
        const { id } = this.props;
        this.props.markAsComplete(id, (error) => {
        if( error )
            alert(error.message);
        });
    };

    markAsInComplete = () => {
        const { id } = this.props;
        this.props.markAsInComplete(id, (error) => {
        if( error )
            alert(error.message);
        });
    };

    deleteTodo = () => {
        const { id } = this.props;
        this.props.deleteTodo(id, (error) => {
            if( error )
                alert(error.message);
        });
    };

    render() {
        const { type } = this.props;

        return (
            <List.Item className='todo'>
                <List.Content>
                    <Button.Group basic size='small'>
                        {String(type) === 'completed' ?
                            <Button icon='undo alternate' onClick={this.markAsInComplete} /> :
                            <Button icon='check' onClick={this.markAsComplete} /> }
                        <Button icon='trash' onClick={this.deleteTodo} />
                    </Button.Group>
                    <List.Header>{this.props.title}</List.Header>
                </List.Content>
            </List.Item>
        )
    }
}

Todo.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    completed_at: PropTypes.string,
    markAsComplete: PropTypes.func.isRequired,
    markAsInComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default Todo