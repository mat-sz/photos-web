import React, { useState } from 'react';

import { authenticate } from '../API';

function Authentication({ error }: {
    error: string
}) {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);

    return (
        <div className="authentication flex-center">
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
                    <button onClick={() => authenticate(username, password)}>Sign in</button>
                </div>
            </section>
        </div>
    );
}

export default Authentication;