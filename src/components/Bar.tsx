import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ActionType } from '../types/ActionType';
import { UserEntity } from '../types/Entities';

function Bar({ user }: { user: UserEntity }) {
    const dispatch = useDispatch();
    const deauthenticate = useCallback(() => {
        dispatch({ type: ActionType.DEAUTHENTICATE });
    }, [ dispatch ]);

    return (
        <nav className="bar">
            { user ?
            <div className="bar__user-info">
                <span>{user.username}</span>
                <button onClick={deauthenticate}>Log out</button>
            </div> :
            <div>Not logged in.</div> }
        </nav>
    );
}

export default Bar;