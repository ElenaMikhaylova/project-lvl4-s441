import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import connect from '../connect';

const mapStateToProps = (state) => {
  const {
    channels: { byId },
    channelsUIstate: { modal },
  } = state;
  const editingChannelName = _.isEmpty(modal) ? '' : byId[modal.id].name;
  return {
    modal,
    initialValues: { name: editingChannelName },
  };
};

@connect(mapStateToProps)
@reduxForm({ form: 'removeChannel' })
class ModalRemoveChannel extends React.Component {
  modalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleRemoveChannel = id => async () => {
    const { removeChannel } = this.props;
    try {
      await removeChannel(id);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  };

  render() {
    const {
      modal,
      handleSubmit,
      submitting,
      error,
      initialValues: { name },
    } = this.props;

    const showModal = !_.isEmpty(modal);
    return (
      <Modal show={showModal} centered onHide={this.modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Remove channel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form-inline"
            onSubmit={handleSubmit(this.handleRemoveChannel(modal.id))}
          >
            <div>{`Remove # ${name} ?`}</div>
            {error && <div className="ml-3 text-danger">{error}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            onClick={handleSubmit(this.handleRemoveChannel(modal.id))}
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
}

export default ModalRemoveChannel;
