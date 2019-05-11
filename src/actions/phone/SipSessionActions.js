import Dispatcher from '../../Dispatcher';

export function hangup() {
    Dispatcher.dispatch({
        actionType: 'HANGUP',
    });
}
export function hold() {
    Dispatcher.dispatch({
        actionType: 'HOLD',
    });
}
export function unhold() {
    Dispatcher.dispatch({
        actionType: 'UNHOLD',
    });
}
export function newInboundSession(session, incomingRequest) {
    Dispatcher.dispatch({
        actionType: 'NEW_INBOUND_SESSION',
        session,
        incomingRequest,
    });
}
export function newOutboundSession(session, outgoingRequest) {
    Dispatcher.dispatch({
        actionType: 'NEW_OUTBOUND_SESSION',
        session,
        outgoingRequest,
    });
}
export function sessionAccepted(data) {
    Dispatcher.dispatch({
        actionType: 'SESSION_ACCEPTED',
        data,
    });
}
export function outboundSessionEnded(data) {
    Dispatcher.dispatch({
        actionType: 'OUTBOUND_SESSION_ENDED',
        data,
    });
}
export function outboundSessionFailed(data) {
    Dispatcher.dispatch({
        actionType: 'OUTBOUND_SESSION_FAILED',
        data,
    });
}