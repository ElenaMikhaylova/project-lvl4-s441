import React from 'react';
import cn from 'classnames';
import connect from '../connect';
import UserContext from '../UserContext';

const mapStateToProps = (state) => {
  const { channels: { allIds, byId, currentChannelId } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, currentChannelId };
};

@connect(mapStateToProps)
class Channels extends React.Component {
  render() {
    const { channels, currentChannelId } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <UserContext.Consumer>
        {userName => (
          <div className="mt-3">
            <p>{userName}</p>
            <ul className="list-group">
              {channels.map(({ id, name }) => {
                const liClass = cn({
                  'list-group-item d-flex': true,
                  active: id === currentChannelId,
                });
                return (
                  <li key={id} className={liClass}>
                    <span className="mr-auto">{name}</span>
                    <button type="button" className="close">
                      <span>&times;</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Channels;
