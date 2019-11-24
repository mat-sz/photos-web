import React from 'react';

import Spinner from './Spinner';

function SpinnerOverlay() {
    return (
        <div className="spinner-overlay flex-center">
            <Spinner />
        </div>
    );
}

export default SpinnerOverlay;