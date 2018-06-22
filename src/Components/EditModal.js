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
        }


    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref('item/' + itemId);
        itemRef.remove();
    }


    modalEdittoggle() {
        this.setState({
            modalEdit: !this.state.modalEdit,
            isVisible: !this.state.isVisible
        });
    }

    render() {
        return (
            <div>
                
                <Modal isOpen={this.state.modalEdit} toggle={this.modalEdittoggle} className={this.props.className}>
                    <ModalHeader toggle={this.modalEdittoggle}>แก้ไขงาน </ModalHeader>
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
                        <Button outline color="secondary" onClick={this.modalEdittoggle}>ยกเลิก</Button>{' '}
                        <Button color="primary" onClick={() => this.handleUpdate()}>บันทึก</Button>
                    </ModalFooter>
                </Modal>

                <Popup trigger={<Button color="danger" className="button"> ลบ </Button>} modal>
                    {close => (
                        <div className="Dmodal">
                            <div className="Dheader"> ยืนยันการลบ </div>
                            <div className="Dactions">
                                <Button color="danger" className="button" onClick={() => this.removeItem(this.props.item.id)}>ลบ</Button>
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