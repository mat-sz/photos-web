import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { UserEntity } from '../types/Entities';

export interface AuthenticationState {
    loggedIn: boolean,
    user: UserEntity,
};

let initialState: AuthenticationState = {
    loggedIn: false,
    user: null,
};
  
export default function authenticationState(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.AUTHENTICATED:
            newState.loggedIn = true;
            newState.user = action.value as UserEntity;
            break;
        case ActionType.DEAUTHENTICATED:
            newState.loggedIn = false;
            newState.user = null;
            break;
        default:
            return state;
    }

    return newState;
};