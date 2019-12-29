import { takeEvery, call } from 'redux-saga/effects';

import { ActionType } from '../types/ActionType';
import { ActionModel } from '../types/Models';

function* setTitle(action: ActionModel) {
    yield call(() => document.title = action.value);
}

export default function* root() {
    yield call(() => document.title = 'photos-web');

    yield takeEvery(ActionType.SET_TITLE, setTitle);
};