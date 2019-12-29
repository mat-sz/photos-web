import { put, takeEvery, call } from 'redux-saga/effects';

import { httpGet } from './http';
import { ActionType } from '../types/ActionType';

function* fetchPhotos() {
    let res = yield call(() => httpGet('photos'));

    if (res) {
        yield put({ type: ActionType.SET_PHOTOS, value: res });
    }
}

export default function* root() {
    yield takeEvery(ActionType.FETCH_PHOTOS, fetchPhotos);
};