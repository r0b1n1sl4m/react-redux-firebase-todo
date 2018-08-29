import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import TodoListsWrapper from './TodoListsWrapper';
import FlashMessageList from './FlashMessagesList';


class IndexPage extends React.Component {
    render() {
        return (
            <div id="indexPage">
                <Grid centered>
                    <Grid.Column mobile={16} tablet={14} computer={10}>
                        <FlashMessageList/>
                        <TodoListsWrapper/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default IndexPage