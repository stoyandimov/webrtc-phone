import Dispatcher from '../../Dispatcher';
import EventEmitter from 'events';
import JsSIP from 'jssip';
import * as LoginActions from '../../actions/login/LoginActions';
import * as SipSessionActions from '../../actions/phone/SipSessionActions';

class SipAgentStore extends EventEmitter {
    constructor() {
        super();
        this.number = '';
        this.asyncTimeout = 100;
        this.ua = null;
    }

    _createAndRegisterUa(uri, password, serverUrl) {
        JsSIP.debug.enable('JsSIP:*');
        this.ua = null;
        var stun_server = "stun:stun.l.google.com:19302"
        // Create User agent
        this.ua = new JsSIP.UA({
            sockets: [ new JsSIP.WebSocketInterface(serverUrl) ],
            stun_server,
            uri,
            password,
        });

        // Setup session initiation event handlers
        this.ua.on('newRTCSession', data => {
            if (data.originator === 'local')
                SipSessionActions.newOutboundSession(data.session, data.request);
            else
                SipSessionActions.newInboundSession(data.session, data.request);
        });

        // Setup registration failure event handlers
        this.ua.on('registrationFailed', data => {
            if (data.cause === JsSIP.C.causes.AUTHENTICATION_ERROR) {
                LoginActions.loginFailed('Incorrect username or password');
            } else {
                LoginActions.loginFailed("Something wen't went wrong. Try again");
                console.log('Reigstration Failed:', data.response ? data.response.reason_phrase : data);
            }
        });

        // Setup registration success event handler
        this.ua.on('registered', data => LoginActions.loggedIn());

        // Start the sip agent
        setTimeout(() => this.ua.start(), this.asyncTimeout);
    }

    formatUri(uri) {
        if (uri.substring(0, 4) !== 'sip:')
        uri = 'sip:' + uri;
        return uri;
    }

    login = (un, pw, svr) => this._createAndRegisterUa(this.formatUri(un), pw, svr);
    logout = () => this.ua.stop();
    call = num => setTimeout(() => this.ua.call(num, { mediaConstraints : { audio: true, video: false } }) , this.asyncTimeout);
    canCall = () => this.ua !== null && this.ua.isRegistered();
}

var store = new SipAgentStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case 'LOGGED_IN': {
            store.emit('change');
            break;
        }
        case 'LOGIN': {
            store.login(action.username, action.password, action.server);
            break;
        }
        case 'CALL': {
            store.call(action.number);
            break;
        }
        case 'LOGOUT': {
            store.logout();
            break;
        }
        default: {}
    }
});

export default store;