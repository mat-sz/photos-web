import { PhotoEntity } from './Entities';

export interface QueueItemType {
  id: string;
  name?: string;
  displayName?: string;
  size: number;
  dataURL: string;
  blob: Blob;
  thumbnailDataURL: string;
  thumbnailBlob: Blob;
}
