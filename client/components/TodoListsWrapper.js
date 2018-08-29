import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Segment, Header, Dimmer, Loader } from 'semantic-ui-react';
import classNames from 'classnames';
import TodoForm from './TodoForm';
import TodoLists from './TodoLists';
import { addTodo, markAsComplete, markAsInComplete, deleteTodo } from "../actions/todoListsActions";
import { addFlashMessage, emptyFlashMessages } from "../actions/flashMessageActions";


class TodoListsWrapper extends React.Component {
    render() {
        const { currentPath, todos, fetching,
            addTodo, addFlashMessage, emptyFlashMessages,
            markAsComplete, markAsInComplete, deleteTodo } = this.props;
        const due_todos = [];
        const completed_todos = [];

        for (const id in todos) {
            if ( todos.hasOwnProperty(id) ) {
                if ( todos[id]['completed_at'] ) {
                    completed_todos[id] = todos[id];
                } else {
                    due_todos[id] = todos[id];
                }
            }
        }

        return (
            <Segment id='todoListsWrapper' stacked>
                <Dimmer active={fetching} inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                <TodoForm addTodo={addTodo} addFlashMessage={addFlashMessage} emptyFlashMessages={emptyFlashMessages} />
                <Switch>
                    <Route exact path='/' render={()=><TodoLists todos={due_todos} todosType='due'
                                                                 markAsComplete={markAsComplete}
                                                                 markAsInComplete={markAsInComplete}
                                                                 deleteTodo={deleteTodo} />} />
                    <Route exact path='/completed' render={()=><TodoLists todos={completed_todos} todosType='completed'
                                                                          markAsComplete={markAsComplete}
                                                                          markAsInComplete={markAsInComplete}
                                                                          deleteTodo={deleteTodo} />} />} />
                </Switch>
                <div className='ui text menu todoListMenu'>
                    <Link to='/' className={classNames('item', {
                        active: (String(currentPath) === '/')
                    })}>Due</Link>
                    <Link to='/completed' className={classNames('item', {
                        active: (String(currentPath) === '/completed')
                    })}>Completed</Link>
                </div>
            </Segment>
        )
    }
}

TodoListsWrapper.propTypes = {
    fetching: PropTypes.bool,
    todos: PropTypes.object.isRequired,
    currentPath: PropTypes.string.isRequired,
    addTodo: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    emptyFlashMessages: PropTypes.func.isRequired,
    markAsComplete: PropTypes.func.isRequired,
    markAsInComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

function initMapStateToProps(state) {
    return {
        fetching: state.todoLists.fetching,
        todos: state.todoLists.todos,
        currentPath: state.router.location.pathname
    }
}

export default connect(initMapStateToProps, { addTodo, addFlashMessage,
    emptyFlashMessages, markAsComplete, markAsInComplete, deleteTodo })(TodoListsWrapper)