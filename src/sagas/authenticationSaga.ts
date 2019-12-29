import { put, takeEvery, call, select } from 'redux-saga/effects';

import { httpGet, httpPost, httpDelete } from './http';
import { ActionType } from '../types/ActionType';
import { ActionModel } from '../types/Models';
import { StateType } from '../reducers';

function* authenticate(action: ActionModel) {
    let res = yield call(() => httpPost('auth', action.value));

    if (!res.success) return;

    yield put({ type: ActionType.SET_TOKEN, value: res.token });

    let authRes = yield call(() => httpGet('auth'));
    yield put({ type: ActionType.AUTHENTICATED, value: authRes.data });
}

function *checkToken() {
    const token = yield select((state: StateType) => state.settings.token);

    if (!token) return;

    const res = yield call(() => httpGet('auth'));

    if (res) {
        yield put({ type: ActionType.AUTHENTICATED, value: res });
    } else {
        yield put({ type: ActionType.SET_TOKEN, value: null });
    }
}

function* signup(action: ActionModel) {
    let res = yield call(() => httpPost('auth/signup', action.value));

    if (!res) return;

    yield call(() => authenticate(action));
}

function* deauthenticate() {
    yield call(() => httpDelete('auth'));
    yield put({ type: ActionType.SET_TOKEN, value: null });
    yield put({ type: ActionType.DEAUTHENTICATED });
}

export default function* root() {
    yield call(checkToken);

    yield takeEvery(ActionType.AUTHENTICATE, authenticate);
    yield takeEvery(ActionType.DEAUTHENTICATE, deauthenticate);
    yield takeEvery(ActionType.SIGNUP, signup);
};