import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { removeFlashMessage } from '../actions/flashMessageActions';


class FlashMessagesList extends React.Component {
    render() {
        const messages = this.props.messages.map(message =>
            <FlashMessage key={message.id} message={message} removeFlashMessage={this.props.removeFlashMessage} />
        );

        return (
            <section id='flashMessagesList'>
                {messages}
            </section>
        )
    }
}

FlashMessagesList.propTypes = {
    messages: PropTypes.array.isRequired,
    removeFlashMessage: PropTypes.func.isRequired
};

function initMapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(initMapStateToProps, { removeFlashMessage })(FlashMessagesList)