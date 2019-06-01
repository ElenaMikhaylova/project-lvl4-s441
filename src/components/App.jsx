import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import NewChannelForm from './NewChannelForm';
import UserInfo from './UserInfo';

const App = () => (
  <div className="row">
    <div className="col">
      <UserInfo />
      <Channels />
      <NewChannelForm />
    </div>
    <div className="col-10">
      <Messages />
      <NewMessageForm />
    </div>
  </div>
);

export default App;
