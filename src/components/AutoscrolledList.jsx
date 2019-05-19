import React from 'react';
import autoscroll from 'autoscroll-react';

const listStyle = {
  overflowY: 'scroll',
  height: 'calc(100vh - 200px)',
};

@autoscroll
class List extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <ul className="list-group mt-3" style={listStyle} {...this.props}>
        {messages.map(({ id, text, userName }) => (
          <li className="list-group-item d-flex" key={id}>
            <div>
              <dt>{userName}</dt>
              <dd>{text}</dd>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
