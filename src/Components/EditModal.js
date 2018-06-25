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
import './Popup.css';
import './Delete.css';
import Upload from './upload';

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEdit: false,
            isvisible: false

        }
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
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
            endDate: '',
            modalEdit: !this.state.modalEdit,
        });

        const item2 = this.state;
        this.props.handleShow(item2)
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref('item/' + itemId);
        itemRef.remove();
    }



    handleSave() {
        const item = this.state;
        this.props.modalEdittoggle(item)
        this.setState({
            modalEdit: !this.state.modalEdit
        });
    }


    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.handleSave}>{this.props.buttonLabel}แก้ไข</Button>
                <Modal isOpen={this.state.modalEdit} toggle={this.handleSave} className={this.props.className}>
                    <ModalHeader toggle={this.handleSave}>แก้ไขงาน </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="taskName">ชื่องาน</Label>
                                <Input type="text" name="taskName" placeholder={this.props.taskName} onChange={this.handleChange} value={this.state.taskName} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDate">startDate</Label>
                                <Input type="date" name="startDate" placeholder={this.props.description} onChange={this.handleChange} value={this.state.startDate} />
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Label for="endDate">endDate</Label>
                                <Input type="date" name="endDate" placeholder={this.props.description} onChange={this.handleChange} value={this.state.endDate} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">คำอธิบาย</Label>
                                <Input type="text" name="description" placeholder={this.props.description} onChange={this.handleChange} value={this.state.description} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.handleSave}>ยกเลิก</Button>{' '}
                        <Button color="primary" onClick={() => this.handleUpdate(this.props.id)}>บันทึก</Button>
                    </ModalFooter>
                </Modal>
                <Popup trigger={<Button color="danger" className="button"> ลบ </Button>} modal>
                    {close => (
                        <div className="Dmodal">
                            <div className="Dheader"> ยืนยันการลบ </div>
                            <div className="Dactions">
                                <Button color="danger" className="button" onClick={() => this.removeItem(this.props.id)}>ลบ</Button>
                                <Button
                                    className="button"
                                    onClick={() => {
                                        console.log('modal closed')
                                        close()
                                    }}
                                >
                                    ยกเลิก</Button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        )
    }
}
export default EditModal;