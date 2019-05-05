import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.toggleChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
}, { byId: {}, allIds: [], currentChannelId: 0 });

const messagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]() {
    return 'requested';
  },
  [actions.fetchMessagesFailure]() {
    return 'failed';
  },
  [actions.fetchMessagesSuccess]() {
    return 'finished';
  },
}, 'none');

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: message }) {
    return [...state, message];
  },
  [actions.fetchMessagesSuccess](state, { payload }) {
    return payload.messages.map(message => message.attributes);
  },
}, []);

export default combineReducers({
  form: formReducer,
  messagesFetchingState,
  messages,
  channels,
});
