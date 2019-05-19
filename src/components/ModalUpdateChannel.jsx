import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import connect from '../connect';

const mapStateToProps = (state) => {
  const {
    channels: { byId },
    channelsUIstate: { modal },
  } = state;
  const name = _.isEmpty(modal) ? '' : byId[modal.id].name;
  return {
    modal,
    initialValues: { name },
  };
};

@connect(mapStateToProps)
@reduxForm({ form: 'updateChannel', enableReinitialize: true })
class ModalUpdateChannel extends React.Component {
  modalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleUpdateChannel = id => async (values) => {
    const { updateChannel } = this.props;
    try {
      await updateChannel(id, values);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      modal,
      handleSubmit,
      pristine,
      submitting,
      error,
    } = this.props;
    const showModal = !_.isEmpty(modal);
    return (
      <Modal show={showModal} centered onHide={this.modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit channel name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form-inline"
            onSubmit={handleSubmit(this.handleUpdateChannel(modal.id))}
          >
            <Field
              name="name"
              required
              disabled={submitting}
              component="input"
              type="text"
              className="form-control"
            />
            {error && <div className="ml-3 text-danger">{error}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={pristine || submitting}
            onClick={handleSubmit(this.handleUpdateChannel(modal.id))}
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

export default ModalUpdateChannel;
