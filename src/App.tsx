import React from 'react';

import './App.scss';
import Authentication from './screens/Authentication';
import ErrorOverlay from './components/ErrorOverlay';
import SpinnerOverlay from './components/SpinnerOverlay';
import Gallery from './screens/Gallery';
import Bar from './components/Bar';
import { useSelector } from 'react-redux';
import { StateType } from './reducers';

function App() {
  const loggedIn = useSelector(
    (state: StateType) => state.authenticationState.loggedIn
  );

  return (
    <div className="app">
      <Bar />
      <ErrorOverlay />
      <SpinnerOverlay />
      {loggedIn ? <Gallery /> : <Authentication />}
    </div>
  );
}

export default App;
