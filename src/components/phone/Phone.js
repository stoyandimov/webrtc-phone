import Controls from './Controls';
import Dialpad from './Dialpad';
import Dialscreen from './Dialscreen';
import PhoneStore from '../../stores/phone/PhoneStore';
import React, { Component } from 'react';
import SipAgentStore from '../../stores/phone/SipAgentStore';
import SipSessionStore from '../../stores/phone/SipSessionStore';

class Phone extends Component {
    constructor() {
        super();
        this.state = {
            canCall: SipAgentStore.canCall(),
            inCall: SipSessionStore.inCall(),
            isCalling: SipSessionStore.isCalling(),
            isHolding: SipSessionStore.isHolding(),
            number: PhoneStore.getNumber(),
        }
    }
    componentDidMount() {
        this.changeHandler = e => {
            this.setState({
                canCall: SipAgentStore.canCall(),
                inCall: SipSessionStore.inCall(),
                isCalling: SipSessionStore.isCalling(),
                isHolding: SipSessionStore.isHolding(),
                number: PhoneStore.getNumber(),
            });
        };
        SipAgentStore.on('change', this.changeHandler);
        SipSessionStore.on('change', this.changeHandler);
        PhoneStore.on('change', this.changeHandler);
    }
    componentWillUnmount = () => {
        SipAgentStore.removeListener('change', this.changeHandler)
        SipSessionStore.removeListener('change', this.changeHandler)
        PhoneStore.removeListener('change', this.changeHandler)
    };
    render() {
        return (
            <section>
                <audio id="remoteAudio"></audio>
                <Dialscreen inCall={this.state.inCall} number={this.state.number} isCalling={this.state.isCalling} />
                <br />
                <Dialpad isCalling={this.state.isCalling} />
                <Controls number={this.state.number}
                          canCall={this.state.canCall}
                          isCalling={this.state.isCalling}
                          isHolding={this.state.isHolding}
                          inCall={this.state.inCall} />
            </section>
        );
    }
}

export default Phone;