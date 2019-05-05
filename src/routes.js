const host = '/api/v1';

// Create new message
// POST /channels/:channelId/messages
// { message: { text: 'your text' } }

// Get List of messages
// GET /channels/:channelId/messages

export default {
  messagesUrl: channelId => [host, 'channels', channelId, 'messages'].join('/'),
  channelsUrl: () => [host, 'channels'].join('/'),
};
