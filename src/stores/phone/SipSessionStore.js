import Dispatcher from '../../Dispatcher';
import EventEmitter from 'events';
import JsSIP from 'jssip';
import * as SipSessionActions from '../../actions/phone/SipSessionActions';
import Toastr from 'toastr';

class SipSessionStore extends EventEmitter {
    constructor() {
        super();
        this.serverUrl = ''
        this.ua = null;
        this.session = null;
        this.asyncTimeout = 100; //ms
    }
    isCalling = () => this.session !== null && this.session.isInProgress();
    isHolding = () => this.session !== null && this.session.isOnHold();
    inCall = () => this.session !== null && this.session.isEstablished();
    configureInboundSession(session, incomingRequest) {
        Toastr.info('Incoming call');
        console.log(incomingRequest);
        this.session = session;
        this.session.on('confirmed', data => SipSessionActions.sessionAccepted(data));
        setTimeout(() => this.session.answer({ mediaConstraints: { audio: true, video: false } }), this.asyncTimeout);
        this.emit('change');
    }
    configureOutboundSession(session, outgoingRequest) {
        Toastr.info(outgoingRequest.to._uri._user, 'Calling');
        this.session = session;
        this.session.on('accepted', data => SipSessionActions.sessionAccepted(data));
        this.session.on('failed', data => SipSessionActions.outboundSessionFailed(data));
        this.session.on('ended', data => SipSessionActions.outboundSessionEnded(data));
        this.emit('change');
    }
    sessionAccepted(data) {
        this.emit('change');
        var remoteAudio = document.getElementById('remoteAudio');
        remoteAudio.srcObject = this.session.connection.getRemoteStreams()[0];
        remoteAudio.play();
    }
    outboundSessionEnded(data) {
        Toastr.clear();
        Toastr.success(data.cause, 'Call ended!');
        console.log(data);
        this.session = null;
        this.emit('change');
    }
    outboundSessionFailed(data) {
        if (data.cause === JsSIP.C.causes.CANCELED) {
            Toastr.clear();
        } else {
            Toastr.clear();
            Toastr.error(data.cause, 'Call failed!');
            console.log("Outbound call failed:");
            console.log(data);
        }
        this.emit('change');
    }
    formatUri(uri) {
        if (uri.substring(0, 4) !== 'sip:')
            uri = 'sip:' + uri;
        return uri;
    }
    hangup() {
        if (this.session !== null)
            setTimeout(() => this.session.terminate(), this.asyncTimeout);
    }
    hold() {
        if (this.session !== null)
            setTimeout(() => this.session.hold(), this.asyncTimeout);
        this.emit('change');
    }
    unhold() {
        if (this.session !== null)
            setTimeout(() => this.session.unhold(), this.asyncTimeout);
        this.emit('change');
    }
    dtmf(tone) {
        if (this.session !== null)
            setTimeout(() => this.session.sendDTMF(tone), this.asyncTimeout);
    }
}

var store = new SipSessionStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case 'DTMF': {
            store.dtmf(action.tone);
            break;
        }
        case 'HANGUP': {
            store.hangup();
            break;
        }
        case 'HOLD': {
            store.hold();
            break;
        }
        case 'UNHOLD': {
            store.unhold();
            break;
        }
        case 'NEW_INBOUND_SESSION': {
            store.configureInboundSession(action.session, action.incomingRequest)
            break;
        }
        case 'NEW_OUTBOUND_SESSION': {
            store.configureOutboundSession(action.session, action.outgoingRequest)
            break;
        }
        case 'SESSION_ACCEPTED': {
            store.sessionAccepted(action.data)
            break;
        }
        case 'OUTBOUND_SESSION_ENDED': {
            store.outboundSessionEnded(action.data)
            break;
        }
        case 'OUTBOUND_SESSION_FAILED': {
            store.outboundSessionFailed(action.data)
            break;
        }
        default: {}
    }
});

export default store;