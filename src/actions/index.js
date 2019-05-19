import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const toggleChannel = createAction('CHANNEL_TOGGLE');

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');

export const addChannel = ({ name }) => async () => {
  const url = routes.channelsUrl();
  const data = JSON.stringify({ data: { attributes: { name } } });
  const config = { headers: { 'Content-Type': 'application/vnd.api+json' } };
  await axios.post(url, data, config);
};

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const url = routes.channelUrl(id);
    await axios.delete(url);
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};

export const updateChannelSuccess = createAction('CHANNEL_UPDATE_SUCCESS');

export const updateChannel = (id, values) => async () => {
  const { name } = values;
  const url = routes.channelUrl(id);
  const data = JSON.stringify({ data: { attributes: { name } } });
  const config = { headers: { 'Content-Type': 'application/vnd.api+json' } };
  await axios.patch(url, data, config);
};

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const addMessage = ({ message, currentChannelId }) => async () => {
  const url = routes.messagesUrl(currentChannelId);
  const data = JSON.stringify({ data: { attributes: message } });
  const config = { headers: { 'Content-Type': 'application/vnd.api+json' } };
  await axios.post(url, data, config);
};

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const fetchMessages = ({ id }) => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const url = routes.messagesUrl(id);
    const response = await axios.get(url);
    dispatch(fetchMessagesSuccess({ messages: response.data }));
    dispatch(toggleChannel({ currentChannelId: id }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};

export const openModalUpdateChannel = createAction('MODAL_OPEN_UPDATE_CHANNEL');
export const openModalRemoveChannel = createAction('MODAL_OPEN_REMOVE_CHANNEL');

export const closeModal = createAction('MODAL_CLOSE');
