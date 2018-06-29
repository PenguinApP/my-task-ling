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

class MenuApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:this.props.user
        }
    }
    render() {
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
    }
}
export default MenuApp;