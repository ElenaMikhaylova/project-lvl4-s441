import React from 'react';
import cn from 'classnames';
import connect from '../connect';
import UserContext from '../UserContext';
import ModalUpdateChannel from './ModalUpdateChannel';
import ModalRemoveChannel from './ModalRemoveChannel';

const mapStateToProps = (state) => {
  const {
    channels: { allIds, byId },
    channelsUIstate: { currentChannelId, modal },
  } = state;
  const channels = allIds.map(id => byId[id]);
  return {
    channels,
    currentChannelId,
    modal,
  };
};

@connect(mapStateToProps)
class Channels extends React.Component {
  handleClickChannel = id => () => {
    const { fetchMessages } = this.props;
    fetchMessages({ id });
  };

  handleClickUpdateBtn = id => () => {
    const { openModal } = this.props;
    openModal({ id, modalState: 'updating' });
  };

  handleClickRemoveBtn = id => () => {
    const { openModal } = this.props;
    openModal({ id, modalState: 'removing' });
  };

  render() {
    const {
      channels,
      modal,
      currentChannelId,
    } = this.props;

    if (channels.length === 0) {
      return null;
    }

    const showModalUpdatingChannel = modal && modal.modalState === 'updating';
    const showModalRemovingChannel = modal && modal.modalState === 'removing';

    return (
      <UserContext.Consumer>
        {userName => (
          <div className="mt-3">
            <h5>{userName}</h5>
            <ul className="nav navbar-nav nav-pills">
              {channels.map(({ id, name, removable }) => {
                const activeClass = cn({
                  'nav-item nav-link': true,
                  active: id === currentChannelId,
                });
                return (
                  <li key={id} className={activeClass}>
                    <button type="button" className="btn btn-sm" onClick={this.handleClickChannel(id)}>
                      <span>{`# ${name}`}</span>
                    </button>
                    <button type="button" disabled={!removable} className="close" onClick={this.handleClickRemoveBtn(id)}>
                      <span>&times;</span>
                    </button>
                    <button type="button" className="close" onClick={this.handleClickUpdateBtn(id)}>
                      <span>&hellip;</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {showModalUpdatingChannel && <ModalUpdateChannel />}
            {showModalRemovingChannel && <ModalRemoveChannel />}
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Channels;
