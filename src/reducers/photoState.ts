import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { PhotoEntity } from '../types/Entities';
import { QueueItemType } from '../types/Queue';

export interface PhotoState {
    photos: PhotoEntity[],
    uploadQueue: QueueItemType[],
};

let initialState: PhotoState = {
    photos: [],
    uploadQueue: [],
};
  
export default function photoState(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.SET_PHOTOS:
            newState.photos = action.value as PhotoEntity[];
            break;
        case ActionType.QUEUE_ADD:
            if (!newState.uploadQueue.find((item) => item.id === action.value.id)) {
                newState.uploadQueue.push(action.value);
            }
            break;
        case ActionType.QUEUE_REMOVE:
            newState.uploadQueue = newState.uploadQueue.filter((item) => item.id === action.value.id);
            break;
        default:
            return state;
    }

    return newState;
};