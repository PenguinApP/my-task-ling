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


class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            modalAdd: false,
            picture: null,
            Picturename: null,
            user: this.props.user
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var itemRef = firebase.database().ref('item');

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
            user: this.state.user.email
        }
        itemRef.push(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            picture: '',
            modalAdd: !this.state.modalAdd,
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

    handleSave() {
        const item = this.state;
        this.props.modalAddtoggle(item)
        this.setState({
            modalAdd: !this.state.modalAdd
        });
    }

    render() {
        const { picture } = this.state;
        return (
            <div>
                <Button outline color="secondary" onClick={this.handleSave} block>{this.props.buttonLabel}เพิ่มงาน</Button>
                <Modal isOpen={this.state.modalAdd} toggle={this.handleSave} className={this.props.className}>
                    <ModalHeader toggle={this.handleSave}>เพิ่มงาน</ModalHeader>
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
                        <Button color="primary" onClick={(e) => this.handleSubmit(e)}>สร้าง</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default AddModal;
