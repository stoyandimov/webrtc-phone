import * as PhoneActions from '../../actions/phone/PhoneActions';
import React, { Component } from 'react';

class Dialpad extends Component {
    onClickDtmf = e => PhoneActions.dtmf(e.target.innerText);
    render() {
        return (
            <section>
                <p>
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">1</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">2</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">3</button>
                </p>
                <p>
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">4</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">5</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">6</button>
                </p>
                <p>
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">7</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">8</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">9</button>
                </p>
                <p>
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">*</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">0</button>&nbsp;
                    <button disabled={this.props.isCalling} onClick={this.onClickDtmf} className="btn btn-lg btn-default">#</button>
                </p>
            </section>
        );
    }
}

export default Dialpad;
