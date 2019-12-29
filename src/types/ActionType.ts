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

    // Settings
    SET_TOKEN = 'SET_TOKEN',
};