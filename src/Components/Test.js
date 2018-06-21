import React, { Component } from 'react';
import firebase, { auth, provider, provider2 } from './config';
import {
    Collapse, CardBody, Card, CardImg, CardText,
    CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import './Task.css';
import Dock from 'react-dock';

class Test extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            items: [],
            user: null,
            show: false,
            collapse: false,
            modal: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleCollapse() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
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
                <Button color="primary" onClick={this.toggleCollapse} style={{ marginBottom: '1rem' }}>Toggle</Button>
                <Button color="danger" onClick={this.toggleModal}> เพิ่มงาน{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>เพิ่มงาน</ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button className="button"
                            onClick={(e) => this.handleSubmit(e)}> Save </Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Collapse isOpen={this.state.collapse}>
                    {this.state.items.map((item) => {
                        return (
                            <div class="block">
                                <Card key={item.id}>
                                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>{item.taskName}</CardTitle>
                                        <CardSubtitle>{item.description}</CardSubtitle>
                                        <CardText>{item.startDate}&nbsp; - &nbsp;{item.endDate}</CardText>
                                        <div class="block2">
                                            <Button>Button</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                                <br />
                            </div>
                        )
                    })}
                </Collapse>
            </div>
        );
    }
}
export default Test;
