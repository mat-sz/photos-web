import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StateType } from '../reducers';
import { ActionType } from '../types/ActionType';

function ErrorOverlay() {
    const error = useSelector((state: StateType) => state.applicationState.error);
    const dispatch = useDispatch();

    const onDismiss = useCallback(() => {
        dispatch({ type: ActionType.DISMISS_ERROR });
    }, [ dispatch ]);

    return (
        <div className={"spinner-overlay flex-center " + ((error) ? "" : "hidden")}>
            <div className="error">
                <div>
                    { error }
                </div>
                <div className="buttons">
                    <button onClick={onDismiss}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorOverlay;