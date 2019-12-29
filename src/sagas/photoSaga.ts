import { put, takeEvery, call } from 'redux-saga/effects';

import { httpGet } from './http';
import { ActionType } from '../types/ActionType';
import { ResponseModel } from '../types/Models';

function* fetchPhotos() {
    let res: ResponseModel = yield call(() => httpGet('photos'));

    if (res.success) {
        yield put({ type: ActionType.SET_PHOTOS, value: res.data });
    }
}

export default function* root() {
    yield takeEvery(ActionType.FETCH_PHOTOS, fetchPhotos);
};