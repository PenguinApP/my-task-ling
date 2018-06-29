import React, { Component } from 'react';
import firebase, { auth, provider, provider2 } from './config';
import logo from './Picture/Ling logo.png';
import { Link } from 'react-router-dom';
import './Login.css'
import {
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import MenuApp from './MenuApp';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            user: null,
            email: '',
            password: ''
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginE = this.loginE.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    loginE(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            alert("Username or Password incorrect")
            console.log(error);
        });
    }


    login = () => {
        var that = this;
        auth.signInWithPopup(provider).then(function (result) {
            var user = result.user;
            console.log(user);
            that.setState({ user: user });
        }).catch(function (error) {

        });
    }
    login2 = () => {
        var that = this;
        auth.signInWithPopup(provider2).then(function (result) {
            var user = result.user;
            console.log(user);
            that.setState({ user: user });
        }).catch(function (error) {

        });
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }
    renderLoginButon() {
        if (this.state.user) {
            return (
                <div>
                    <div class="loginpage"></div>
                    <div className="loading container wrapper LoginFont">
                        <p class="logo"><img src={logo} className="App-logo" alt="logo" />
                            <div class="regisBtn">
                                <Link to="/Task" >เพื่มงาน</Link>
                            </div>
                            <div class="form-group">
                            </div><br />
                        </p></div ></div >

            )
        } else {
            return (
                <div>
                    <div class="loginpage"></div>
                    <div className="loading container wrapper LoginFont">
                        <p class="logo"><img src={logo} className="App-logo" alt="logo" />
                            <br /> Log In </p>
                        <Form>
                            <FormGroup>
                                <Label for="taskName"><p class="loginText">Username</p></Label>
                                <Input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDate"><p class="loginText">Password</p></Label>
                                <Input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </FormGroup>
                        </Form>

                        <div class="LoginButton">
                            <Link to="/Home" >    <button type="submit" onClick={this.loginE} class="loginBtn loginBtn--L">&nbsp;Log In with email</button></Link>
                            <button className="loginBtn loginBtn--facebook" onClick={this.login}> Log In with Facebook</button>
                            <button className="loginBtn loginBtn--google" onClick={this.login2}>Log In with Google</button><br />
                        </div>
                        <div class="regisBtn">
                            <Link to="/Register" >สมัครสมาชิก</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/Reset" >ลืมรหัสผ่าน</Link>
                        </div>
                        <br /> <br />

                    </div>
                </div>
            )

        }
    }

    render() {
        return (
            <div>
                {this.renderLoginButon()}
            </div>
        );
    }
}

export default Login;