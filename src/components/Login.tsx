import * as React from 'react';
import { connect } from 'react-redux';
import './loginStyle.css';
import Utils from '../utils';
import Spinner from "./Spinner";
const axios = require('axios');
const FormData = require('form-data');

class LoginForm extends React.Component {

    state = {
        event: 'initial',
        username: '',
        password: '',
    }

    constructor(props: Readonly<{}>) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount() {
    
        const self = this;
        self.setState({ event: "beginGetToken" });

        const transport = Utils.createApiClient();

        transport.get('/get-csrf-token/')
        .then(function (response: any) {
            Utils.setCsrfToken(response.data["csrftoken"])
            console.log(response);
            self.setState({ event: "endedGetToken" });
        })
        .catch(function (error: any) {
            console.log(error);
            self.setState({ event: "failGetToken" });
        })
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            event: 'editing'
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (window.confirm("Are you ready?")) {

            let self = this;
            this.setState({ event: "beginLogin" });

            var token = Utils.getCsrfToken();

            const form = new FormData();
            form.append('csrfmiddlewaretoken', token);
            form.append('username', this.state.username);
            form.append('password', this.state.password);

            const transport = Utils.createApiClient();

            transport.post('/accounts/login/', form)
            .then(function (response: any) {
                console.log(response);
                
                Utils.setUsername(response.data[Utils.kUsername]);
                Utils.setEmail(response.data[Utils.kEmail]);
                Utils.setFullName(response.data[Utils.kFullname])
                
                document.location.pathname = '/';
            })
            .catch(function (error: any) {
                console.log(error);
                self.setState({ event: "failLogin" });
            })
            .then(function () {
                // always executed
            });
        }
    }

    render() {

        let spinnerClass = '';
        let formClass = '';
        let btnClass = '';
        let msgLabelClass = 'hidden-item';

        switch (this.state.event) {
            case "beginLogin":
                btnClass = 'hidden-item';
                break;
            case "endedLogin":
                spinnerClass += 'hidden-item';
                
                break;
            case "failLogin":
                spinnerClass += 'hidden-item';
                formClass += "highlight-red";
                msgLabelClass = '';

                this.state.password = '';
                break;
            default:
                spinnerClass += 'hidden-item';
                break;
        }
            

        return (
            <div className="loginbox">
                                
                <img src="Images/Icons/building-line.png" className="avatar" />
                <h1>Login Here</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>Username</p>
                    <input type="text" name="username" id="username" className={formClass}
                        placeholder="Enter Username" onChange={this.handleChange} required />
                    <p>Password</p>
                    <input type="password" name="password" id="password" className={formClass}
                        placeholder="Enter Password"
                        value={this.state.password} onChange={this.handleChange} required />
                    
                    <div className="spinner-parent">
                        <Spinner additionalClasses={spinnerClass}></Spinner>
                    </div>

                    <div className={msgLabelClass}>
                        <p className="red-label">Could not login with username and password</p>
                    </div>

                    <div className={btnClass}>
                        <input type="submit" name="submit" id="submit-btn" value="Login" />
                        <a href="#">Lost your password?</a><br />
                        <a href="#">Don't have an account?</a>
                    </div>
                </form>
            </div>
            );
    }
}

export default connect()(LoginForm);
