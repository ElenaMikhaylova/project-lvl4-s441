import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import connect from '../connect';
import UserContext from '../UserContext';

const mapStateToProps = (state) => {
  const { channels: { currentChannelId } } = state;
  return { currentChannelId };
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  static contextType = UserContext;

  addMessage = async (values) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const message = { ...values, userName: this.context };
    try {
      await addMessage({ message, currentChannelId });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      error,
    } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group mx-3">
          <Field name="text" required disabled={submitting} component="input" type="text" />
        </div>
        <button type="submit" className="btn btn-primary btn-sm" disabled={pristine || submitting}>Send</button>
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

export default NewMessageForm;
