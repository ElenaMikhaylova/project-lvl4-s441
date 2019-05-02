import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { channels: { allIds, byId } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels };
};

class Channels extends React.Component {
  handleClick = () => {

  };

  render() {
    const { channels } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {channels.map(({ id, name }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{name}</span>
              <button type="button" className="close" onClick={this.handleClick}>
                <span>&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Channels);
