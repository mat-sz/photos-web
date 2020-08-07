import React from 'react';
import { useSelector } from 'react-redux';

import Spinner from './Spinner';
import { StateType } from '../reducers';

function SpinnerOverlay() {
  const loading = useSelector(
    (state: StateType) => state.applicationState.loading
  );

  return (
    <div className={'spinner-overlay flex-center ' + (loading ? '' : 'hidden')}>
      <Spinner />
    </div>
  );
}

export default SpinnerOverlay;
