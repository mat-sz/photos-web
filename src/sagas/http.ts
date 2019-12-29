import { put, call, select } from 'redux-saga/effects';

import { ActionType } from '../types/ActionType';
import { StateType } from '../reducers';

export const url = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/';

async function tryJson(response: Response): Promise<any> {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

let activeRequests = 0;
function* http(method: string, action: string, body?: FormData|string) {
    activeRequests++;
    yield put({ type: ActionType.SET_LOADING, value: true });
    const token = yield select((state: StateType) => state.settings.token);

    let headers: any = {
        'Authorization': token,
        'Accept': 'application/json',
    };

    if (typeof body === 'string') {
        headers['Content-Type'] = 'application/json';
    }

    let res = yield call(() => fetch(url + action, {
        body: body,
        method: method,
        headers: headers,
    }));

    activeRequests--;

    if (activeRequests < 0) {
        // Should never happen, but let's protect ourselves against that.
        activeRequests = 0;
    }

    yield put({ type: ActionType.SET_LOADING, value: activeRequests !== 0 });

    let json = (yield call(() => tryJson(res)));

    if (json && json.error) {
        yield put({ type: ActionType.SET_ERROR, value: json.error.message });
    }

    return json;
}

export function* httpGet(action: string) {
    return yield call(() => http('GET', action));
}

export function* httpPost(action: string, data: any) {
    return yield call(() => http('POST', action, JSON.stringify(data)));
}

export function* httpUpload(action: string, data: any) {
    let formData = new FormData();
    
    if (data) {
        for (let row of Object.keys(data)) {
            if (row === 'key') continue;
            if (typeof data[row] === 'undefined' || data[row] === null) continue;
            formData.append(row, data[row]);
        }
    }

    return yield call(() => http('POST', action, formData));
}

export function* httpDelete(action: string) {
    return yield call(() => http('DELETE', action));
}