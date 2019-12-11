import React from 'react';
import { UserType } from '../types/API';

import { deauthenticate } from '../API';

function Bar({ user }: { user: UserType }) {
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