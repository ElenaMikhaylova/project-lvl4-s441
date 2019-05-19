const host = '/api/v1';

export default {
  messagesUrl: channelId => [host, 'channels', channelId, 'messages'].join('/'),
  channelsUrl: () => [host, 'channels'].join('/'),
  channelUrl: id => [host, 'channels', id].join('/'),
};
