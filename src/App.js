import './App.css';
import Login from './components/login/Login';
import * as  LoginActions from './actions/login/LoginActions';
import LoginStore from './stores/login/LoginStore'
import Phone from './components/phone/Phone';
import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = { 
            showPhone: false,
        };
    }
    componentDidMount() {
        this.changeHandler = (e) => {
            this.setState({
                showPhone: LoginStore.isLoggedIn,
            })
        };
        LoginStore.on('change', this.changeHandler);
    }
    componentWillUnmount = () => LoginStore.removeListener('change', this.changeHandler);
    onClickLogout = () => LoginActions.logout();
    render() {
        return (
            <div className="App">
                <div className="container" style={{width: "181px"}}>
                    <header>
                        <br />
                        <h4 className="text-center">
                            WebRTC Phone
                            { this.state.showPhone ?
                                <button onClick={this.onClickLogout} title="Logout" className="btn btn-xs btn-default">
                                    <i className="glyphicon glyphicon-log-out" />
                                </button>
                            : null
                            }
                        </h4>
                    </header>
                    <hr />
                    <main>
                        { this.state.showPhone ? <Phone /> : <Login /> }
                    </main>
                    <hr />
                    <footer>
                        <p className="text-center"> { new Date().getFullYear() } &copy; scho</p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
