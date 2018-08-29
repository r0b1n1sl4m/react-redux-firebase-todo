import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import Todo from "./Todo";


class TodoLists extends React.Component {
    render() {
        const todos = [];
        for (const key in this.props.todos) {
            const todo = this.props.todos[key];
            todos.push(<Todo key={key} id={key} type={this.props.todosType}
                             title={todo.title}
                             created_at={todo.created_at}
                             completed_at={todo.completed_at}
                             markAsComplete={this.props.markAsComplete}
                             markAsInComplete={this.props.markAsInComplete}
                             deleteTodo={this.props.deleteTodo} />)
        }

        const no_todos = (
            <List.Item className='todo'>
                <List.Content>
                    <List.Header>{this.props.todosType === 'due' ? 'You have no todos to complete' : 'You have not completed any todo yet'}</List.Header>
                </List.Content>
            </List.Item>
        );

        return (
            <List id='todoLists' celled>
                {todos.length > 0 ? todos : no_todos}
            </List>
        )
    }
}

TodoLists.propTypes = {
    todos: PropTypes.array.isRequired,
    todosType: PropTypes.string.isRequired,
    markAsComplete: PropTypes.func.isRequired,
    markAsInComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoLists