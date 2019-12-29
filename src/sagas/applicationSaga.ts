import { takeEvery, call, put } from 'redux-saga/effects';

import { ActionType } from '../types/ActionType';
import { ActionModel, ResponseModel } from '../types/Models';
import { httpGet } from './http';

function* setTitle(action: ActionModel) {
    yield call(() => document.title = action.value);
}

function* updateInstanceInfo() {
    let res: ResponseModel = yield call(() => httpGet('instance'));

    if (res.data && res.data.title) {
        yield put({ type: ActionType.SET_TITLE, value: res.data.title });
    }
}

export default function* root() {
    yield call(() => document.title = 'photos-web');

    yield takeEvery(ActionType.SET_TITLE, setTitle);

    yield call(() => updateInstanceInfo());
};