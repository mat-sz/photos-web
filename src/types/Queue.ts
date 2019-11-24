import { PhotoType } from "./API";

export interface QueueItemType {
    name?: string,
    displayName?: string,
    size: number,
    dataURL: string,
    blob: Blob,
    thumbnailDataURL: string,
    thumbnailBlob: Blob,
    uploading: boolean,
    error: boolean,
    photo?: PhotoType,
};