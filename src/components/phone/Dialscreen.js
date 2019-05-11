import React, { Component } from 'react';
import PhoneStore from '../../stores/phone/PhoneStore';

class Dialscreen extends Component {
    onChangeNumber = e => PhoneStore.setNumber(e.target.value);
    onClickClear = e => PhoneStore.setNumber('');
    render() {
        return (
            <section>
                <div className="input-group" role="group">
                    <input autoComplete="on" name="number" disabled={this.props.isCalling || this.props.inCall} type="text" value={this.props.number} onChange={this.onChangeNumber} className="form-control" placeholder="Number" />
                    <span className="input-group-btn">
                        <button disabled={this.props.isCalling || this.props.inCall} onClick={this.onClickClear} className="btn btn-default">
                            <i className="glyphicon glyphicon-remove" />
                        </button>
                    </span>
                </div>
            </section>
        );
    }
}

export default Dialscreen;
