import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import connect from '../connect';
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
  handleClickChannel = (id) => {
    const { fetchMessages } = this.props;
    fetchMessages({ id });
  };

  handleClickUpdateBtn = id => (e) => {
    e.stopPropagation();
    const { openModal } = this.props;
    openModal({ id, modalState: 'updating' });
  };

  handleClickRemoveBtn = id => (e) => {
    e.stopPropagation();
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
      <div className="mt-3">
        <Nav
          className="flex-column border"
          variant="pills"
          activeKey={currentChannelId}
          onSelect={selectedKey => this.handleClickChannel(selectedKey)}
        >
          {channels.map(({ id, name, removable }) => (
            <Nav.Item key={id}>
              <Nav.Link eventKey={id}>
                {`# ${name}`}
                <button type="button" className="close ml-2" disabled={!removable} onClick={this.handleClickRemoveBtn(id)}>
                  <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                </button>
                <button type="button" className="close" onClick={this.handleClickUpdateBtn(id)}>
                  <FontAwesomeIcon icon={faEdit} size="xs" />
                </button>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        {showModalUpdatingChannel && <ModalUpdateChannel />}
        {showModalRemovingChannel && <ModalRemoveChannel />}
      </div>
    );
  }
}

export default Channels;
