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
    const { byId, allIds, currentChannelId } = state;
    return {
      ...state,
      allIds: allIds.filter(channelId => channelId !== id),
      byId: _.omit(byId, id),
      currentChannelId: currentChannelId === id ? allIds[0] : currentChannelId,
    };
  },
  [actions.updateChannelSuccess](state, { payload: channel }) {
    const { byId } = state;
    return {
      ...state,
      byId: { ...byId, [channel.id]: channel },
    };
  },
  [actions.toggleChannel](state, { payload: { currentChannelId } }) {
    return { ...state, currentChannelId };
  },
}, { byId: {}, allIds: [], currentChannelId: 0 });

const channelsRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelsUIstate = handleActions({
  [actions.openModalUpdateChannel](state, { payload: { id } }) {
    return { ...state, [id]: { state: 'updating' } };
  },
  [actions.openModalRemoveChannel](state, { payload: { id } }) {
    return { ...state, [id]: { state: 'removing' } };
  },
  [actions.closeModal]() {
    return {};
  },
}, {});

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
  channelsRemovingState,
  channelsUIstate,
  messages,
  messagesFetchingState,
});
