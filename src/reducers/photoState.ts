import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { PhotoEntity } from '../types/Entities';

export interface PhotoState {
    photos: PhotoEntity[],
};

let initialState: PhotoState = {
    photos: [],
};
  
export default function projectState(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.SET_PHOTOS:
            newState.photos = action.value as PhotoEntity[];
            break;
        default:
            return state;
    }

    return newState;
};