import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import _ from 'lodash';
import reducers from './reducers';
import App from './components/App';

export default (gon) => {
  const { channels } = gon;
  const allIds = channels.map(channel => channel.id);
  const byId = _.zipObject(allIds, channels);
  const initState = { channels: { byId, allIds } };

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    reducers,
    initState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
