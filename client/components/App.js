import React from 'react';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import FlashMessagesList from './FlashMessagesList'
import Main from './Main';

class App extends React.Component {
    render() {
        const currentPath = window.location.pathname;
        const flashTweakedRoutes = ['/', '/login', '/signup'];

        return (
            <Container>
                <Header/>
                {!flashTweakedRoutes.includes(currentPath) ? <FlashMessagesList /> : null }
                <Main/>
            </Container>
        )
    }
}

export default App