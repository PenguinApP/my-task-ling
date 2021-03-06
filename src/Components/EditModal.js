import React, { Component } from 'react';
import firebase from './config';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import './Task.css';
import picfarm from './Picture/picfarm.jpg';
import './Delete.css';


class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEdit: false,
            modalDelete: false,
            picture: this.props.picture,
            taskName: this.props.taskName,
            description: this.props.description,
            startDate: this.props.startDate,
            endDate: this.props.endDate

        }
        this.handleSave = this.handleSave.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
            picture: this.state.picture,
        }
        itemRef.update(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            picture: '',
            modalEdit: !this.state.modalEdit,
        });

    }

    handleUpload(event) {
        var tempThis = this;
        var file = event.target.files[0];
        var storageRef = firebase.storage().ref(`/picfile/${file.name}`);
        var task = storageRef.put(file);

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message);

        }, function () {
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('The download URL : ', downloadURL);
                tempThis.setState({
                    uploadValue: 100,
                    picture: downloadURL

                });
            });
        });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref('item/' + itemId);
        itemRef.remove();
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    }

    handleSave() {
        const item = this.state;
        this.props.modalEdittoggle(item)
        this.setState({
            modalEdit: !this.state.modalEdit
        });
    }

    handleDelete() {
        const item = this.state;
        this.props.modalDeletetoggle(item)
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    }

    render() {
        const { picture } = this.state;
        return (
            <div>
                <Button color="secondary" onClick={this.handleSave}>{this.props.buttonLabel}แก้ไข</Button>
                <Modal isOpen={this.state.modalEdit} toggle={this.handleSave} className={this.props.className}>
                    <ModalHeader toggle={this.handleSave}>แก้ไขงาน </ModalHeader>
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
                            <FormGroup>
                                <div>
                                    <progress value={this.state.uploadValue} max="100">
                                        {this.state.uploadValue} %
                            </progress>
                                    <br />
                                    <input type="file" onChange={this.handleUpload} />
                                    <br />
                                    <img src={picture || picfarm} alt="" />
                                </div>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.handleSave}>ยกเลิก</Button>{' '}
                        <Button color="primary" onClick={() => this.handleUpdate(this.props.id)}>บันทึก</Button>
                    </ModalFooter>
                </Modal>

                <Button color="danger" onClick={this.handleDelete}>{this.props.buttonLabel}ลบ</Button>
                <Modal isOpen={this.state.modalDelete} toggle={this.handleDelete} className={this.props.className}>
                    <ModalHeader toggle={this.handleDelete}>ยืนยันการลบ</ModalHeader>
                    <ModalBody>
                        <p class="Deletetext">หากลบงานที่เลือกแล้ว จะไม่สามารถกู้คืนได้</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.handleDelete}>ยกเลิก</Button>{' '}
                        <Button color="danger" onClick={() => this.removeItem(this.props.id)}>ลบ</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default EditModal;