import { takeEvery, call, put } from 'redux-saga/effects';

import { ActionType } from '../types/ActionType';
import { ActionModel } from '../types/Models';
import { httpGet } from './http';

function* setTitle(action: ActionModel) {
    yield call(() => document.title = action.value);
}

function* updateInstanceInfo() {
    let res = yield call(() => httpGet('instance'));

    if (res.title) {
        yield put({ type: ActionType.SET_TITLE, value: res.title });
    }
}

export default function* root() {
    yield call(() => document.title = 'photos-web');

    yield takeEvery(ActionType.SET_TITLE, setTitle);

    yield call(() => updateInstanceInfo());
};