import Dispatcher from '../../Dispatcher';

export function loggedIn() {
    Dispatcher.dispatch({
        actionType: 'LOGGED_IN',
    });
}
export function login(username, password, server) {
    Dispatcher.dispatch({
        actionType: 'LOGIN',
        username,
        password,
        server,
    });
}
export function loginFailed(message) {
    Dispatcher.dispatch({
        actionType: 'LOGIN_FAILED',
        message,
    });
}
export function logout() {
    Dispatcher.dispatch({
        actionType: 'LOGOUT',
    });
}