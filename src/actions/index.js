import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const toggleChannel = createAction('CHANNEL_TOGGLE');

export const addMessage = ({ message, currentChannelId }) => async () => {
  const url = routes.messagesUrl(currentChannelId);
  const data = JSON.stringify({ data: { attributes: message } });
  const config = { headers: { 'Content-Type': 'application/vnd.api+json' } };
  await axios.post(url, data, config);
};

export const fetchMessages = currentChannelId => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const url = routes.messagesUrl(currentChannelId);
    const response = await axios.get(url);
    dispatch(fetchMessagesSuccess({ messages: response.data }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};
