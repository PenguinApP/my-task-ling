import React, { Component } from 'react';
import firebase from './config/Fire';
import './App.css';
import { Link } from 'react-router-dom'
import { provider, auth, provider2 } from './config/Fire';
import logo from './config/Ling logo.png';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerU = this.registerU.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    registerU(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            alert('Register Complete');
        }).catch((error) => {
            alert('username ที่ใส่ไม่ถูกต้อง หรือ ได้ถูกใช้ไปแล้ว')
            console.log(error);
        });

    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }
    verifyEmail(e) {
        e.preventDefault();
        firebase.auth().currentUser.sendEmailVerification().then((u) => {
            alert("Please Check Your Mail");
        }).catch((error) => {
            console.log(error);
            alert("Error");
        });
    }
    renderRegister() {
        if (this.state.user) {
            return (
                <div className="loading container wrapper">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div class="form-group">
                        <Link to="/Task" >Go to Upload</Link>
                        <button type="submit" onClick={this.verifyEmail} class="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ส่งเมล</button>
                    </div>
                    <div class="form-group">
                    </div><br />
                </div>

            )
        } else {
            return (
                <div className="App">
                    <div className="loading container wrapper">
                        <img src={logo} className="App-logo" alt="logo" />
                        <br />
                        <p class="sansserif">สมัครสมาชิก</p>
                        <div class="form-group">
                            <label for="exampleInputEmail1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Username&nbsp;&nbsp;:</label>
                            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" /><br /><br /><br />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password</label>&nbsp;&nbsp;:
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div><br />
                        <button type="submit" onClick={this.registerU} class="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยืนยัน</button>  <br /><br />
                        <Link to="/" >Back</Link>
                        <br /> <br />


                    </div>

                </div>
            );
        }
    }
    render() {
        return (
            <div className="App">
                {this.renderRegister()}

            </div>
        );
    }
}
export default Register;