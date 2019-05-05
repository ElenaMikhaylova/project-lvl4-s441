import React from 'react';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { messagesFetchingState, messages } = state;
  return { messages, messagesFetchingState };
};

@connect(mapStateToProps)
class Messages extends React.Component {
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

    if (messages.length === 0) {
      return null;
    }
    return (
      <div className="mt-3">
        <ul className="list-group">
          {messages.map(({ id, text, userName }) => (
            <li className="list-group-item d-flex" key={id}>
              <div>
                <dt>{userName}</dt>
                <dd>{text}</dd>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Messages;
