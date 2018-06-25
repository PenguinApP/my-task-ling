import React, { Component } from 'react';
import firebase, { auth, provider, provider2 } from './config';
import {
    Collapse,
    CardBody,
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardSubtitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Container,
    Row, Col,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import './Task.css';
import Dock from 'react-dock';
import picfarm from './picfarm.jpg';
import Popup from "reactjs-popup";
import './Delete.css';
import Upload from './upload';
import EditModal from './EditModal';

class Test2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            items: [],
            user: null,
            TaskId: null,
            isVisible: false,
            modalAdd: false,
            modalEdit: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.modalAddtoggle = this.modalAddtoggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalEdittoggle = this.modalEdittoggle.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleShow() {
        this.setState({ isVisible: true });
    }

    modalEdittoggle(item) {
        this.setState({
            modalEdit: !this.state.modalEdit,
            isVisible: !this.state.isVisible
        });
    }

    modalAddtoggle() {
        this.setState({
            modalAdd: !this.state.modalAdd,
            isVisible: !this.state.isVisible
        });
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
            user: this.state.user.displayName || this.state.user.email,
            TaskId: this.state.TaskId
        }
        itemsRef.push(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            modalAdd: !this.state.modalAdd,
            isVisible: true
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
            <div class="Home" >
                <Button color="primary" onClick={this.handleShow}>{this.props.buttonLabel}แสดงงาน</Button>
                <Dock size="0.6" position="bottom" dimMode="none" isVisible={this.state.isVisible}>
                    <div>
                        <Row>
                            <Col>
                                <div class="Add"><Button onClick={() => this.setState({ isVisible: !this.state.isVisible })}>ปิด</Button>
                                    <div class="block">
                                        <Button outline color="info" onClick={this.modalAddtoggle}>{this.props.buttonLabel}เพิ่มงาน</Button>
                                        <br /><br />
                                    </div></div></Col>
                        </Row>
                        {this.state.items.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div class="card2">
                                        <div>
                                            <img src={picfarm} className="pic" alt="Card image" />
                                        </div>
                                        <div class="container">
                                            <br />
                                            <div class="block2">
                                                <EditModal
                                                    taskName={item.taskName}
                                                    description={item.description}
                                                    startDate={item.startDate}
                                                    endDate={item.endDate}
                                                    id={item.id}
                                                    modalEdittoggle={this.modalEdittoggle}
                                                    handleShow={this.handleShow}
                                                />
                                            </div>
                                            <CardTitle>{item.taskName}</CardTitle>
                                            <CardText>{item.description}</CardText>
                                            <CardSubtitle>{item.startDate} - {item.endDate}</CardSubtitle>
                                            <br />
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            )
                        })}
                    </div>

                </Dock>

                <Modal isOpen={this.state.modalAdd} toggle={this.modalAddtoggle} className={this.props.className}>
                    <ModalHeader toggle={this.modalAddtoggle}>เพิ่มงาน</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="taskName">ชื่องาน</Label>
                                <Input type="text" name="taskName" onChange={this.handleChange} value={this.state.taskName} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDate">startDate</Label>
                                <Input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} />
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Label for="endDate">endDate</Label>
                                <Input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">คำอธิบาย</Label>
                                <Input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.modalAddtoggle}>ยกเลิก</Button>{' '}
                        <Button color="primary" onClick={(e) => this.handleSubmit(e)}>สร้าง</Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}

export default Test2;
