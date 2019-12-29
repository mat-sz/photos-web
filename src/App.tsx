import React, { useState, useEffect } from 'react';

import './App.scss';
import Authentication from './screens/Authentication';
import SpinnerOverlay from './components/SpinnerOverlay';
import Gallery from './screens/Gallery';
import * as API from './API';
import { UserType, InstanceType } from './types/API';
import Bar from './components/Bar';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from './types/ActionType';
import { StateType } from './reducers';

function App() {
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(true);
    const loggedIn = useSelector((state: StateType) => state.authenticationState.loggedIn);
    const user = useSelector((state: StateType) => state.authenticationState.user);

    // Behaves like the good old "componentDidMount" when the second argument is an empty array.
    useEffect(() => {
        // API events.
        API.on('authenticated', (user: UserType) => {
            dispatch({ type: ActionType.AUTHENTICATED, value: user });
        });
    
        API.on('deauthenticated', () => {
            dispatch({ type: ActionType.DEAUTHENTICATED });
        });
    
        API.on('error', (e: string) => {
            dispatch({ type: ActionType.SET_ERROR, value: e });
        });

        API.crudIndex('instance').then((instance: InstanceType) => {
            dispatch({ type: ActionType.SET_TITLE, value: instance.title });
        });

        // Check if there's a saved token in our local storage.
        // And verify whether it's correct with the API.
        if (localStorage.getItem('token')) {
            API.checkToken(localStorage.getItem('token')).then((json) => {
                if (json) {
                    dispatch({ type: ActionType.AUTHENTICATED, value: json });
                } else {
                    dispatch({ type: ActionType.DEAUTHENTICATED });
                }

                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="app">
            <Bar user={user} />
            { loading ? <SpinnerOverlay /> : null }
            { loggedIn ?
                <Gallery />
            :
                <Authentication />
            }
        </div>
    );
}

export default App;