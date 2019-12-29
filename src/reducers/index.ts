import { combineReducers, Store } from 'redux';

import applicationState, { ApplicationState } from './applicationState';
import authenticationState, { AuthenticationState } from './authenticationState';
import photoState, { PhotoState } from './photoState';
import settings, { Settings } from './settings';
import { ActionModel } from '../types/Models';

export type StateType = {
    applicationState: ApplicationState;
    authenticationState: AuthenticationState;
    photoState: PhotoState,
    settings: Settings;
};

export type StoreType = Store<StateType, ActionModel>;

export default combineReducers({
    applicationState,
    authenticationState,
    photoState,
    settings,
});