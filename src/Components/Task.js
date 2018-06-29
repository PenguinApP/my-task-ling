import React, { Component } from 'react';
import firebase, { auth } from './config';
import {
    Collapse,
    Button,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import './Task.css';
import './Delete.css';

import AddModal from './AddModal';
import TaskCard from './TaskCard';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAdd: false,
            collapse: false,
            user: this.props.user
        }
        this.handleChange = this.handleChange.bind(this);
        this.modalAddtoggle = this.modalAddtoggle.bind(this);
        this.collapsetoggle = this.collapsetoggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    modalAddtoggle(item) {
        this.setState({
            modalAdd: !this.state.modalAdd,
            picture: null,
        });
    }

    collapsetoggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    logout() {
        firebase.auth().signOut();
        this.setState({ user: null });
    }

    state = { selectedFile: null }

    renderCard() {
        if (this.state.user) {
            return (
                <div class="Home" >
                    <Navbar fixed="top" color="light" light expand="md">
                        <NavbarBrand>Ling Task List
                        <br />
                            <p class="UserTopTask">User : {this.state.user.displayName || this.state.user.email}</p></NavbarBrand>
                        <NavbarToggler onClick={this.collapsetoggle} />
                        <Collapse isOpen={this.state.collapse} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <AddModal
                                        modalAddtoggle={this.modalAddtoggle}
                                        user={this.state.user}
                                    />
                                </NavItem>
                                <NavItem>
                                    <Link to="/" >
                                        <Button color="danger" onClick={this.logout} block>Log Out</Button>
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <TaskCard />

                </div >
            )
        }
        else {

        }
    }

    render() {
        return (
            <div class="TaskPage">
                {this.renderCard()}
            </div>
        )
    }
}

export default Task;
