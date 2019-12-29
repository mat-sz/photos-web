export enum ActionType {
    // Application state
    SET_ERROR = 'SET_ERROR',
    DISMISS_ERROR = 'DISMISS_ERROR',
    SET_LOADING = 'SET_LOADING',
    SET_TITLE = 'SET_TITLE',

    // Authentication state
    AUTHENTICATED = 'AUTHENTICATED',
    DEAUTHENTICATED = 'DEAUTHENTICATED',

    // Authentication actions
    AUTHENTICATE = 'AUTHENTICATE',
    DEAUTHENTICATE = 'DEAUTHENTICATE',
    SIGNUP = 'SIGNUP',

    // Photos
    FETCH_PHOTOS = 'FETCH_PHOTOS',
    SET_PHOTOS = 'SET_PHOTOS',
    QUEUE_ADD = 'QUEUE_ADD',
    QUEUE_REMOVE = 'QUEUE_REMOVE',

    // Settings
    SET_TOKEN = 'SET_TOKEN',
};