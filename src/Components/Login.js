import React, { Component } from 'react';
import firebase from './config/Fire';
import {provider,auth,provider2} from './config/Fire';
import logo from './config/Ling logo.png';
import './Login.css';
import { Link } from 'react-router-dom';
import Register from './Register';
import Task from './Task';

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
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        alert("Username or Password incorrect")
        console.log(error);
      });
  }  

 
login = () => {
    var that = this;
    const result = auth.signInWithPopup(provider).then(function (result) {
        var user = result.user;
        console.log(user);
        that.setState({ user: user });
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}
login2 = () => {
    var that = this;
    const result = auth.signInWithPopup(provider2).then(function (result) {
        var user = result.user;
        console.log(user);
        that.setState({ user: user });
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
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
      return(
        <div className="loading container wrapper">
        <img src={logo} className="App-logo" alt="logo" />  
        <div class="form-group">
        <Link to="/Task" >เพิ่มงาน</Link> 
</div>
<div class="form-group">
</div><br/>
    </div>
    
)
  } else {
    return (
            <div className="loading container wrapper">
                    <img src={logo} className="App-logo" alt="logo" />
                    <br />
                        <p class="sansserif">Log in</p>
                    <div class="form-group">
                <label for="exampleInputEmail1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Username&nbsp;&nbsp;:</label>
                <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" /><br/><br/><br/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password</label>&nbsp;&nbsp;:
              <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div><br/>
            <button type="submit" onClick={this.loginE} class="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login</button>
             
           <button className="loginBtn loginBtn--facebook" onClick={this.login}> Log in with Facebook</button> 
            <button className="loginBtn loginBtn--google" onClick={this.login2}>Log in with Google</button> <br/><br/>
            <Link to="/Register" >สมัครสมาชิก</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/Reset" >ลืมรหัสผ่าน</Link> 
          
                   
                    <br /> <br />
                 
           
                </div>


       
        
    )
    
  }
}

render() {
  return (
      <div className="App">
          {this.renderLoginButon()}
        
      </div>
  );
}
}

  export default Login;