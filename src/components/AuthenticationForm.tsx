import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ActionType } from '../types/ActionType';

function AuthenticationForm({ signup = false }: {
    signup?: boolean,
}) {
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ passwordConfirmation, setPasswordConfirmation ] = useState(null);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

    const action = useCallback(() => {
        if (signup) {
            dispatch({ type: ActionType.SIGNUP, value: {
                username: username,
                password: password,
            }});
        } else {
            dispatch({ type: ActionType.AUTHENTICATE, value: {
                username: username,
                password: password,
            }});
        }
    }, [ username, password, dispatch, signup ]);

    return (
        <section className="form">
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