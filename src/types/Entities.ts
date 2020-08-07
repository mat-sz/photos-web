export interface UserEntity {
  id: number;
  username: string;
}

export interface PhotoEntity {
  id: string;
  title: string;
  private: boolean;
  key?: string;
  mimetype: string;
  thumbnailMimetype: string;
}
