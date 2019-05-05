import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import UserContext from './UserContext';

export default (initState, userName) => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    reducers,
    initState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
  /* eslint-enable */

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );

  return store;
};
