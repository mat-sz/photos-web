import React, { useState, useCallback, useMemo, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { ActionType } from '../types/ActionType';

function AuthenticationForm({ isSignup = false }: { isSignup?: boolean }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setPasswordConfirmation(e.target.value);

  const formDisabled = useMemo(
    () =>
      !username || !password || (isSignup && password !== passwordConfirmation),
    [username, password, isSignup, passwordConfirmation]
  );

  const action = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (formDisabled) {
        return;
      }

      const model = {
        username: username,
        password: password,
      };

      dispatch({
        type: isSignup ? ActionType.SIGNUP : ActionType.AUTHENTICATE,
        value: model,
      });
    },
    [username, password, dispatch, isSignup, formDisabled]
  );

  return (
    <section className="form">
      <form onSubmit={action}>
        <label>
          <input placeholder="Username" onChange={onChangeUsername} />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            onChange={onChangePassword}
          />
        </label>
        {isSignup ? (
          <label>
            <input
              placeholder="Confirm password"
              type="password"
              onChange={onChangePasswordConfirmation}
            />
          </label>
        ) : null}
        <div className="form__buttons">
          <button
            type="submit"
            disabled={
              !username ||
              !password ||
              (isSignup && password !== passwordConfirmation)
            }
          >
            {isSignup ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthenticationForm;
