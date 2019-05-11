import Dispatcher from '../../Dispatcher';

export function call(number) {
    Dispatcher.dispatch({
        actionType: 'CALL',
        number,
    });
}
export function clear() {
    Dispatcher.dispatch({
        actionType: 'CLEAR',
    });
}
export function dtmf(tone) {
    Dispatcher.dispatch({
        actionType: 'DTMF',
        tone,
    });
}