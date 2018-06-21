import React, { Component } from 'react';
import './Task.css';
import './Popup.css';
import './Delete.css';
import Popup from "reactjs-popup";
import firebase, { auth, provider, provider2 } from './config';
import {
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
    ButtonToolbar,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    MenuItem,
    UncontrolledDropdown
} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

class Task extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            items: [],
            user: null,
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        var itemsRef = firebase.database().ref('item');

        var sd = new Date(this.state.startDate);

        console.log(sd);

        var ed = new Date(this.state.endDate);
        console.log(ed);

        var item = {
            taskName: this.state.taskName,
            description: this.state.description,
            startDate: sd.getTime(),
            endDate: ed.getTime(),
            user: this.state.user.displayName || this.state.user.email
        }
        itemsRef.push(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
        });
    }

    handleUpdate(itemId) {
        var itemRef = firebase.database().ref('item/' + itemId);

        var sd = new Date(this.state.startDate);

        console.log(sd);

        var ed = new Date(this.state.endDate);
        console.log(ed);

        var item = {
            taskName: this.state.taskName,
            description: this.state.description,
            startDate: sd.getTime(),
            endDate: ed.getTime(),
        }
        itemRef.update(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: ''
        });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref('item/' + itemId);
        itemRef.remove();
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

    logout = () => {
        var that = this;
        auth.signOut().then(function () {
            that.setState({ user: null });
        }).catch(function (error) {
        });
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
        var itemsRef = firebase.database().ref('item').orderByChild('startDate').on('value', (snapshot) => {
            let newState = [];
            snapshot.forEach(function (childSnapshot) {
                var childkey = childSnapshot.key;
                var childData = childSnapshot.val();

                var isd = new Date(childData.startDate);
                var ied = new Date(childData.endDate);

                var sdyear = isd.getFullYear();
                var sdmonth = isd.getMonth() + 1;
                var sdday = isd.getDate();

                var sdstring = '' + sdday + ' / ' + sdmonth + ' / ' + sdyear;

                var edyear = ied.getFullYear();
                var edmonth = ied.getMonth() + 1;
                var edday = ied.getDate();

                var edstring = '' + edday + ' / ' + edmonth + ' / ' + edyear;
                newState.push({
                    id: childkey,
                    taskName: childData.taskName,
                    description: childData.description,
                    startDate: sdstring,
                    endDate: edstring,
                    user: childData.user
                });
            });
            this.setState({
                items: newState
            });
        });
    }

    render() {
        return (
            <div>
                <div class="block">
                    <ButtonToolbar>
                        <Button bsStyle="link" onClick={this.handleShow}>
                            + เพิ่มงาน
                    </Button>
                        <Modal
                            {...this.props}
                            show={this.state.show}
                            onHide={this.handleHide}
                            dialogClassName="custom-modal"
                        >
                            <Modal.Header AddButton>
                                <Modal.Title>
                                    เพิ่มงาน
                    </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <br /><br />
                                <p>&nbsp;Task Name : <input type="text" name="taskName" onChange={this.handleChange} value={this.state.taskName} /></p>
                                <br /><br />
                                <p>&nbsp;Description : <input type="text" name="description" onChange={this.handleChange} value={this.state.description} /></p>
                                <br /><br />
                                <p>&nbsp;Start : <input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} /></p>
                                <br /><br />
                                <p>&nbsp;End : <input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} /></p>
                                <br /><br />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleHide}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </ButtonToolbar>
                    <Popup trigger={<button type="button"> + เพิ่มงาน </button>} modal>
                        {close => (
                            <div className="modal">
                                <div className="header"> Add item </div>
                                <div className="content">
                                    <br /><br />
                                    <p>&nbsp;Task Name : <input type="text" name="taskName" onChange={this.handleChange} value={this.state.taskName} /></p>
                                    <br /><br />
                                    <p>&nbsp;Description : <input type="text" name="description" onChange={this.handleChange} value={this.state.description} /></p>
                                    <br /><br />
                                    <p>&nbsp;Start : <input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} /></p>
                                    <br /><br />
                                    <p>&nbsp;End : <input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} /></p>
                                    <br /><br />
                                </div>
                                <div className="actions">
                                    <button className="button"
                                        onClick={(e) => this.handleSubmit(e) & close()}> Save </button>
                                    <button
                                        className="button"
                                        onClick={() => {
                                            console.log('modal closed ')
                                            close()
                                        }}
                                    >
                                        Cancel</button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {this.state.items.map((item) => {
                            return (
                                <CSSTransition
                                    key={item.id}
                                    timeout={500}
                                    classNames="fade"
                                >
                                    <ListGroupItem>
                                        <div class="block">
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret>
                                                    ตั้งค่า
                                        </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>แก้ไข</DropdownItem>
                                                    <DropdownItem>ลบ</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem>แชร์</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                        <p>{item.taskName}</p>
                                        <p>{item.description}</p>
                                        <p>{item.startDate} - {item.endDate}</p>
                                        <br />
                                    </ListGroupItem>
                                </CSSTransition>
                            )
                        })}
                    </TransitionGroup>
                </ListGroup>
            </div>
        );
    }
}
export default Task;
