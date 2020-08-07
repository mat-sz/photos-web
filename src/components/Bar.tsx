import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActionType } from '../types/ActionType';
import { StateType } from '../reducers';

function Bar() {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: StateType) => state.authenticationState.user
  );
  const uploadQueue = useSelector(
    (state: StateType) => state.photoState.uploadQueue
  );

  const deauthenticate = useCallback(() => {
    dispatch({ type: ActionType.DEAUTHENTICATE });
  }, [dispatch]);

  if (!user) {
    return (
      <nav className="bar">
        <div>Not logged in.</div>
      </nav>
    );
  }

  return (
    <nav className="bar">
      <div className="bar__queue-info">
        {uploadQueue.length > 0 ? (
          <span>Uploading... {uploadQueue.length} photos left.</span>
        ) : null}
      </div>
      <div className="bar__user-info">
        <span>{user.username}</span>
        <button onClick={deauthenticate}>Log out</button>
      </div>
    </nav>
  );
}

export default Bar;
