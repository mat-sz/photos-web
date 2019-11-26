import React, { useState } from 'react';

import { authenticate, register } from '../API';
import Tabs from '../components/Tabs';

function Authentication({ error }: {
    error: string
}) {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ passwordConfirmation, setPasswordConfirmation ] = useState(null);

    return (
        <div className="authentication flex-center">
            <Tabs titles={ ["Sign in", "Sign up"] }>
                <section className="form">
                    { error ?
                    <div className="form__error">{error}</div>
                    : null }
                    <label>
                        <input
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className="form__buttons">
                        <button onClick={() => authenticate(username, password)}
                            disabled={!username || !password}>
                            Sign in
                        </button>
                    </div>
                </section>
                <section className="form">
                    { error ?
                    <div className="form__error">{error}</div>
                    : null }
                    <label>
                        <input
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label>
                        <input
                            placeholder="Confirm password"
                            type="password"
                            onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </label>
                    <div className="form__buttons">
                        <button onClick={() => register(username, password)}
                            disabled={!username || !password || password !== passwordConfirmation}>
                            Sign up
                        </button>
                    </div>
                </section>
            </Tabs>
        </div>
    );
}

export default Authentication;