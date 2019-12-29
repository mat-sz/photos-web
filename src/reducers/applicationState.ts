import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';

export interface ApplicationState {
    loading: boolean,
    error: string,
};

let initialState: ApplicationState = {
    loading: false,
    error: null,
};
  
export default function applicationState(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.SET_ERROR:
            newState.error = action.value as string;
            break;
        case ActionType.DISMISS_ERROR:
            newState.error = null;
            break;
        case ActionType.SET_LOADING:
            newState.loading = action.value as boolean;
            break;
        default:
            return state;
    }

    return newState;
};