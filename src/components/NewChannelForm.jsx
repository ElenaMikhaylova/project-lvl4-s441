import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels } = state;
  return { channels };
};

@reduxForm({ form: 'newChannel' })
@connect(mapStateToProps)
class NewChannelForm extends React.Component {
  addChannel = async (values) => {
    const { addChannel, reset } = this.props;
    try {
      await addChannel({ ...values });
      reset();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      error,
    } = this.props;
    return (
      <div className="mt-3">
        <form className="form-inline" onSubmit={handleSubmit(this.addChannel)}>
          <div className="form-group">
            <Field
              name="name"
              type="text"
              className="form-control form-control-sm"
              disabled={submitting}
              component="input"
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={pristine || submitting}>+</button>
          </div>
          {error && <div className="ml-3">{error}</div>}
        </form>
      </div>
    );
  }
}

export default NewChannelForm;
