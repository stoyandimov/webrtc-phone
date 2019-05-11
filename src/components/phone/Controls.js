import React, { Component } from 'react';
import * as SipAgentActions from '../../actions/phone/PhoneActions';
import * as SipSessionActions from '../../actions/phone/SipSessionActions';

class Controls extends Component {
    onClickCall = e => SipAgentActions.call(this.props.number);
    onClickHold = e => SipSessionActions.hold();
    onClickUnhold = e => SipSessionActions.unhold();
    onClickHangup = e => SipSessionActions.hangup();
    render() {
        return (
            <div className="btn-group" role="group">
                {
                    !this.props.isCalling && !this.props.inCall ?
                        <button onClick={this.onClickCall} className="btn btn-lg btn-success">
                            <i className="glyphicon glyphicon-earphone small"></i>
                        </button>
                    :
                        <React.Fragment>
                            <button onClick={this.onClickHangup} title="Hangup" className="btn btn-lg btn-danger">
                                <i className="glyphicon glyphicon-phone-alt small"></i>
                            </button>
                            {/* { this.props.isHolding ? */}
                                <button onClick={this.onClickUnhold} title="Unhold" className="btn btn-lg btn-success">
                                    <i className="glyphicon glyphicon-ok-circle small"></i>
                                </button>
                            {/* : */}
                                <button onClick={this.onClickHold} title="Hold" className="btn btn-lg btn-warning">
                                    <i className="glyphicon glyphicon-ban-circle small"></i>
                                </button>
                            {/* } */}
                        </React.Fragment>
                }
            </div>
        );
    }
}

export default Controls