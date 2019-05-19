import React from 'react';
import cn from 'classnames';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import connect from '../connect';
import UserContext from '../UserContext';

const mapStateToProps = (state) => {
  const {
    channels: { allIds, byId, currentChannelId },
    channelsRemovingState,
    channelsUIstate,
  } = state;
  const channels = allIds.map(id => byId[id]);
  const updatingChannelId = _.findKey(channelsUIstate, ['state', 'updating']);
  const updatingChannelName = updatingChannelId ? byId[updatingChannelId].name : '';
  const removingChannelId = _.findKey(channelsUIstate, ['state', 'removing']);
  const removingChannelName = removingChannelId ? byId[removingChannelId].name : '';
  return {
    channels,
    channelsRemovingState,
    currentChannelId,
    updatingChannelId,
    removingChannelId,
    removingChannelName,
    initialValues: { name: updatingChannelName },
  };
};

@connect(mapStateToProps)
@reduxForm({ form: 'updateChannel', enableReinitialize: true })
class Channels extends React.Component {
  handleClickChannel = id => () => {
    const { fetchMessages } = this.props;
    fetchMessages({ id });
  };

  modalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleClickUpdateBtn = id => () => {
    const { openModalUpdateChannel } = this.props;
    openModalUpdateChannel({ id });
  };

  handleClickRemoveBtn = id => () => {
    const { openModalRemoveChannel } = this.props;
    openModalRemoveChannel({ id });
  };

  handleRemoveChannel = id => async () => {
    const { removeChannel, channelsRemovingState } = this.props;
    await removeChannel(id);
    if (channelsRemovingState === 'finished') {
      this.modalClose();
    }
  };

  handleUpdateChannel = id => async (values) => {
    const { updateChannel } = this.props;
    try {
      await updateChannel(id, values);
      this.modalClose();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  renderUpdatingModal() {
    const {
      updatingChannelId,
      handleSubmit,
      pristine,
      submitting,
      error,
    } = this.props;
    return (
      <Modal show centered onHide={this.modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit channel name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-inline" onSubmit={handleSubmit(this.handleUpdateChannel(updatingChannelId))}>
            <Field
              name="name"
              required
              disabled={submitting}
              component="input"
              type="text"
              className="form-control"
            />
            {error && <div className="ml-3">{error}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={pristine || submitting}
            onClick={handleSubmit(this.handleUpdateChannel(updatingChannelId))}
          >
            OK
          </button>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={this.modalClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderRemovingModal() {
    const { removingChannelId, removingChannelName, channelsRemovingState } = this.props;
    const requested = channelsRemovingState === 'requested';
    const failed = channelsRemovingState === 'failed';
    return (
      <Modal show centered onHide={this.modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Remove channel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Remove # ${removingChannelName} ?`}
          {requested && (
            <div className="spinner-border m-3" role="status">
              <span className="sr-only">Removing...</span>
            </div>
          )}
          {failed && <span className="sr-only">Error!</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={requested} onClick={this.handleRemoveChannel(removingChannelId)}>OK</Button>
          <Button variant="secondary" onClick={this.modalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const {
      channels,
      currentChannelId,
      updatingChannelId,
      removingChannelId,
    } = this.props;

    if (channels.length === 0) {
      return null;
    }

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
                    <button type="button" className="btn btn-sm" onClick={this.handleClickUpdateBtn(id)}>
                      <span>&hellip;</span>
                    </button>
                    {removable && (
                      <button type="button" className="close" onClick={this.handleClickRemoveBtn(id)}>
                        <span>&times;</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            {updatingChannelId && this.renderUpdatingModal()}
            {removingChannelId && this.renderRemovingModal()}
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Channels;
