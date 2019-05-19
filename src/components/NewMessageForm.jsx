import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import connect from '../connect';
import UserContext from '../UserContext';

const mapStateToProps = (state) => {
  const {
    channels: { byId },
    channelsUIstate: { currentChannelId },
  } = state;
  const { name } = byId[currentChannelId];
  return { currentChannelId, currentChannelName: name };
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.text = React.createRef();
  }

  componentDidMount() {
    this.text.current.getRenderedComponent().focus();
  }

  componentDidUpdate() {
    this.text.current.getRenderedComponent().focus();
  }

  addMessage = async (values) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const message = { ...values, userName: this.context };
    try {
      await addMessage({ message, currentChannelId });
      reset();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      currentChannelName,
      handleSubmit,
      pristine,
      submitting,
      error,
    } = this.props;

    const formStyle = {
      height: '40px',
    };
    return (

      <form className="form-inline mt-3" style={formStyle} onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group mx-3">
          <Field
            name="text"
            component="input"
            type="text"
            disabled={submitting}
            className="form-control"
            placeholder={`Message #${currentChannelName}`}
            width="100%"
            forwardRef
            ref={this.text}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm" disabled={pristine || submitting}>Send</button>
        {error && <div className="ml-3">{error}</div>}
      </form>

    );
  }
}

export default NewMessageForm;
