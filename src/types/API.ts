export interface UserType {
    id: number,
    username: string,
};

export interface PhotoType {
    id: string,
    title: string,
    private: boolean,
    key?: string,
    mimetype: string,
    thumbnailMimetype: string,
};

export interface ObjectType {
    id: string|number,
    [x: string]: any,
};