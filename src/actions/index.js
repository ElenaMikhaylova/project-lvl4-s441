import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');

export const addChannel = ({ name }) => async () => {
  const url = routes.channelsUrl();
  const data = { attributes: { name } };
  await axios.post(url, { data });
};

export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');

export const removeChannel = id => async () => {
  const url = routes.channelUrl(id);
  await axios.delete(url);
};

export const updateChannelSuccess = createAction('CHANNEL_UPDATE_SUCCESS');

export const updateChannel = (id, values) => async () => {
  const { name } = values;
  const url = routes.channelUrl(id);
  const data = { attributes: { name } };
  await axios.patch(url, { data });
};

export const addMessageSuccess = createAction('MESSAGES_ADD_SUCCESS');

export const addMessage = ({ message, currentChannelId }) => async () => {
  const url = routes.messagesUrl(currentChannelId);
  const data = { attributes: message };
  await axios.post(url, { data });
};

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const fetchMessages = ({ id }) => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const url = routes.messagesUrl(id);
    const response = await axios.get(url);
    dispatch(fetchMessagesSuccess({ messages: response.data, currentChannelId: id }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');
