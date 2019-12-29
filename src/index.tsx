import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './store';
import { localStorageKey } from './reducers/settings';

const store = createStore();

store.subscribe(() => {
    const settings = store.getState().settings;
    localStorage.setItem(localStorageKey, JSON.stringify(settings));
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));