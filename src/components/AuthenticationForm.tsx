import React, { useState } from 'react';

import { authenticate, register } from '../API';

function AuthenticationForm({ error, signup = false }: {
    error: string,
    signup?: boolean,
}) {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ passwordConfirmation, setPasswordConfirmation ] = useState(null);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

    const action = () => {
        if (signup) {
            register(username, password);
        } else {
            authenticate(username, password);
        }
    }

    return (
        <section className="form">
            { error ?
            <div className="form__error">{error}</div>
            : null }
            <label>
                <input
                    placeholder="Username"
                    onChange={onChangeUsername} />
            </label>
            <label>
                <input
                    placeholder="Password"
                    type="password"
                    onChange={onChangePassword} />
            </label>
            { signup ?
                <label>
                    <input
                        placeholder="Confirm password"
                        type="password"
                        onChange={onChangePasswordConfirmation} />
                </label>
            : null }
            <div className="form__buttons">
                <button onClick={action}
                    disabled={!username || !password || (signup && password !== passwordConfirmation)}>
                    { signup ? 'Sign up' : 'Sign in' }
                </button>
            </div>
        </section>
    );
}

export default AuthenticationForm;