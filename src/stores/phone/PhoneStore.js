import Dispatcher from '../../Dispatcher';
import EventEmitter from 'events';

class PhoneStore extends EventEmitter {
    constructor() {
        super();
        this.number = '';
    }
    getNumber = () => this.number;
    setNumber(number) {
        this.number = number;
        this.emit('change');
    }
}

const store = new PhoneStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case 'CLEAR': {
            store.setNumber('');
            break;
        }
        case 'DTMF': {
            store.setNumber(store.getNumber() + action.tone);
            break;
        }
        default: {}
    }
});

export default store;