import React, { useState, useEffect } from 'react';

import './App.scss';
import Authentication from './screens/Authentication';
import SpinnerOverlay from './components/SpinnerOverlay';
import Gallery from './screens/Gallery';
import * as API from './API';
import { UserType } from './types/API';
import Bar from './components/Bar';

function App() {
    const [ loading, setLoading ] = useState(true);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState(null);

    // Behaves like the good old "componentDidMount" when the second argument is an empty array.
    useEffect(() => {
        // API events.
        API.on("authenticated", (user: UserType) => {
            setLoading(false);
            setUser(user);
            setLoggedIn(true);
        });
    
        API.on("deauthenticated", () => {
            setLoading(false);
            setLoggedIn(false);
            setUser(null);
        });
    
        API.on("error", (e: string) => {
            setError(e);
        });

        // Check if there's a saved token in our local storage.
        // And verify whether it's correct with the API.
        if (localStorage.getItem('token')) {
            API.checkToken(localStorage.getItem('token')).then((json) => {
                if (json) {
                    setUser(json);
                    setLoggedIn(true);
                } else {
                    setUser(null);
                    setLoggedIn(false);
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
            : <Authentication error={error} />}
        </div>
    );
}

export default App;