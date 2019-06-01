import React from 'react';
import UserContext from '../UserContext';

const UserInfo = () => (
  <UserContext.Consumer>
    {userName => <h5>{userName}</h5>}
  </UserContext.Consumer>
);

export default UserInfo;
