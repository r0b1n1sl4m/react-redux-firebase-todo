import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';


class FlashMessage extends React.Component {
    handleDismiss = () => this.props.removeFlashMessage(this.props.message.id);

    render () {
        const { color, icon, message } = this.props.message;
        return (
            <Message className='flashMessage' color={color} icon={!!icon} onDismiss={this.handleDismiss}>
                {icon ? <Icon name={icon} /> : null}
                <Message.Content className='flashMessageText'>
                    {message}
                </Message.Content>
            </Message>
        )
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    removeFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage