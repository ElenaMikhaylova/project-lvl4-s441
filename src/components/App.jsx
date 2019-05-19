import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import NewChannelForm from './NewChannelForm';

const App = () => (
  <div className="row">
    <div className="col-3">
      <Channels />
      <NewChannelForm />
    </div>
    <div className="col-9">
      <Messages />
      <NewMessageForm />
    </div>
  </div>
);

export default App;
