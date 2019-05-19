import React from 'react';
import connect from '../connect';
import AutoscrolledList from './AutoscrolledList';

const mapStateToProps = (state) => {
  const { messagesFetchingState, messages } = state;
  return { messages, messagesFetchingState };
};

@connect(mapStateToProps)
class MessageList extends React.Component {
  render() {
    const { messages, messagesFetchingState } = this.props;
    if (messagesFetchingState === 'requested') {
      return (
        <div className="spinner-border m-3" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    if (messagesFetchingState === 'failed') {
      return (
        <span>Please, reload page!</span>
      );
    }

    return (
      <AutoscrolledList messages={messages} />
    );
  }
}

export default MessageList;
