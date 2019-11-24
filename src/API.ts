import Config from './Config';
import * as Types from './types/API';

let token: string;
let url = Config.url;
let handlers: {[index: string]: any[]} = {
    'authenticated': [],
    'deauthenticated': [],
    'error': [],
};

function executeHandlers(eventName: string, args?: any[]) {
    handlers[eventName].forEach((func) => func.apply(null, args));
}

function isAuthenticated(json: any) {
    if (json.error && json.error.status === 403) {
        executeHandlers("deauthenticated");
    }
}

async function httpGet(action: string) {
    let req = await fetch(url + action, {
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
        }
    });
    
    let json = await req.json();
    isAuthenticated(json);
    return json;
}

async function httpPost(action: string, data: any) {
    let req = await fetch(url + action, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    let json = await req.json();
    isAuthenticated(json);
    return json;
}

async function httpPostForm(action: string, data: any) {
    let formData = new FormData();
    
    if (data) {
        for (let row of Object.keys(data)) {
            if (row === 'key') continue;
            if (typeof data[row] === 'undefined' || data[row] === null) continue;
            formData.append(row, data[row]);
        }
    }

    let req = await fetch(url + action, {
        body: formData,
        method: "POST",
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
        }
    });

    let json = await req.json();
    isAuthenticated(json);
    return json;
}

async function httpDelete(action: string) {
    let req = await fetch(url + action, {
        method: "DELETE",
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
        }
    });

    let json = await req.json();
    isAuthenticated(json);
    return json;
}

/* Public things here */

/**
 * Get all objects of type.
 * @param {String} type 
 */
async function crudIndex(type: string) {
    return httpGet(type);
}

/**
 * Get more detailed information about an object with a given id.
 * @param {String} type 
 * @param {String|Number} id 
 */
async function crudShow(type: string, id: string|number) {
    return httpGet(type + '/' + id);
}

/**
 * Save an object of a given type.
 * @param {String} type 
 * @param {Object} object 
 */
async function crudStore(type: string, object: any) {
    return httpPost(type, object);
}

/**
 * Save an object of a given type. (Supports file uploads.)
 * @param {String} type 
 * @param {Object} object 
 */
async function crudUpload(type: string, object: any) {
    return httpPostForm(type, object);
}

/**
 * Update an object. (The object must have an 'id' field)
 * @param {String} type 
 * @param {Object} object 
 */
async function crudUpdate(type: string, object: Types.ObjectType) {
    return httpPost(type + '/' + object.id, object);
}

/**
 * Delete an object. (The object must have an 'id' field)
 * @param {String} type 
 * @param {Object} object 
 */
async function crudDelete(type: string, object: Types.ObjectType) {
    return httpDelete(type + '/' + object.id);
}

/* Auth */

/**
 * Retrieves information about the currently logged in user.
 */
async function user(): Promise<Types.UserType> {
    const json = await httpGet('auth');
    if (json && json.authenticated) {
        return json.user;
    } else {
        return null;
    }
}

/**
 * Log in.
 * @param {String} username 
 * @param {String} password 
 */
async function authenticate(username: string, password: string) {
    let res = await httpPost('auth', {
        username: username,
        password: password,
    });

    if (!res) return null;

    if (res['token']) {
        token = res['token'];
        localStorage.setItem('token', token);
        executeHandlers('authenticated', [await user()]);
        return res;
    }

    return res;
}

/**
 * Check whether a saved token is valid.
 * @param {String} value 
 */
async function checkToken(value: string) {
    token = value;
    const json = await user();
    if (!json) {
        token = null;
    }

    return json;
}

/**
 * Event handling.
 * @param {String} eventName Events: authenticated, deauthenticated, error.
 * @param {Function} func 
 */
function on(eventName: string, func: Function) {
    if (handlers.hasOwnProperty(eventName)) {
        handlers[eventName].push(func);
    }
}

export {
    crudIndex,
    crudShow,
    crudUpload,
    crudStore,
    crudUpdate,
    crudDelete,
    authenticate,
    checkToken,
    on,
}