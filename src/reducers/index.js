import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: channel }) {
    const { byId, allIds } = state;
    return {
      ...state,
      allIds: [...allIds, channel.id],
      byId: { ...byId, [channel.id]: channel },
    };
  },
  [actions.removeChannelSuccess](state, { payload: id }) {
    const { byId, allIds } = state;
    return {
      ...state,
      allIds: allIds.filter(channelId => channelId !== id),
      byId: _.omit(byId, id),
    };
  },
  [actions.updateChannelSuccess](state, { payload: channel }) {
    const { byId } = state;
    return {
      ...state,
      byId: { ...byId, [channel.id]: channel },
    };
  },
}, { byId: {}, allIds: [] });

const channelsUIstate = handleActions({
  [actions.fetchMessagesSuccess](state, { payload: { currentChannelId } }) {
    return { ...state, currentChannelId };
  },
  [actions.removeChannelSuccess](state) {
    return {
      ...state,
      modal: {},
      currentChannelId: 1,
    };
  },
  [actions.openModal](state, { payload: { id, modalState } }) {
    return { ...state, modal: { id, modalState } };
  },
  [actions.closeModal](state) {
    return { ...state, modal: {} };
  },
  [actions.updateChannelSuccess](state) {
    return { ...state, modal: {} };
  },
}, { currentChannelId: 1, modal: {} });

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: message }) {
    return [...state, message];
  },
  [actions.fetchMessagesSuccess](state, { payload }) {
    return payload.messages.map(message => message.attributes);
  },
  [actions.removeChannelSuccess](state, { payload: id }) {
    return state.filter(message => message.channelId !== id);
  },
}, []);

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

export default combineReducers({
  form: formReducer,
  channels,
  channelsUIstate,
  messages,
  messagesFetchingState,
});
