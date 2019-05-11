import Dispatcher from '../../Dispatcher';
import EventEmitter from 'events';
import Toastr from 'toastr';

class LoginStore extends EventEmitter {
    loggedIn() {
        this.isLoggedIn = true;
        this.emit('change');
    }
    loginFailed(message) {
        this.isLoggedIn = false;
        Toastr.error(message);
        this.emit('change');
    }
    logout() {
        this.isLoggedIn = false;
        this.emit('change');
    }
}

const store = new LoginStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case 'LOGGED_IN': {
            store.loggedIn();
            break;
        }
        case 'LOGIN_FAILED': {
            store.loginFailed(action.message);
            break;
        }
        case 'LOGOUT': {
            store.logout();
            break;
        }
        default: {}
    }
});

export default store