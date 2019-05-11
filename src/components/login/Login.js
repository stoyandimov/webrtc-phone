import * as LoginActions from '../../actions/login/LoginActions';
import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = { 
            server: '',
            username: '',
            password: ''
        }
    }
    onChangeUsername = e => this.setState({ username: e.target.value });
    onChangePassword = e => this.setState({ password: e.target.value });
    onClickLogin = () => LoginActions.login(this.state.username, this.state.password, "wss://" + this.state.username.split("@")[1]);
    onKeyPress = e => {
        if (e.key === 'Enter')
            this.onClickLogin();
    }
    render() {
        return (
            <section>
                <form>
                    <div className="form-group">
                        <input type="text" name="username" onKeyPress={this.onKeyPress} onChange={this.onChangeUsername} className="form-control" value={this.state.username} placeholder="Username" />
                        <small className="form-text text-muted">sip:username@full.url:443</small>
                    </div>
                </form>
                <div className="form-group">
                    <input type="password" name="password" onKeyPress={this.onKeyPress} onChange={this.onChangePassword} className="form-control" value={this.state.password} placeholder="Password" />
                </div>
                <div className="form-group">
                    <button onClick={this.onClickLogin} className="btn btn-success" style={{width:"100%"}}>Login</button>
                </div>
            </section>
        );
    }
}

export default Login;