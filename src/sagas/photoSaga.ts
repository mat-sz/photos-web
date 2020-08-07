import {
  put,
  takeEvery,
  call,
  actionChannel,
  take,
  fork,
} from 'redux-saga/effects';
import { buffers } from 'redux-saga';

import { httpGet, httpUpload } from './http';
import { ActionType } from '../types/ActionType';
import { ResponseModel } from '../types/Models';
import { QueueItemType } from '../types/Queue';
import { Action } from 'redux';

function* fetchPhotos() {
  let res: ResponseModel = yield call(() => httpGet('photos'));

  if (res.success) {
    yield put({ type: ActionType.SET_PHOTOS, value: res.data });
  }
}

function* uploadQueue() {
  const buffer = buffers.expanding<Action<any>>();
  const channel = yield actionChannel(ActionType.QUEUE_ADD, buffer);

  while (true) {
    const { value }: { value: QueueItemType } = yield take(channel);

    yield call(() =>
      httpUpload('photos', {
        thumbnail: value.thumbnailBlob,
        full: value.blob,
        private: false,
        title: value.name,
      })
    );

    yield put({ type: ActionType.QUEUE_REMOVE, value: value });
    yield put({ type: ActionType.FETCH_PHOTOS });
  }
}

export default function* root() {
  yield takeEvery(ActionType.FETCH_PHOTOS, fetchPhotos);
  yield fork(uploadQueue);
}
