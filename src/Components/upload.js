import React, { Component } from 'react';
import firebase from 'firebase';
import ImageUploader from 'react-images-upload';

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            picture: null
        };

        this.handleUpload = this.handleUpload.bind(this);

    }
    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref('filepond/'+ file.name);
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message);
        }, () => {
            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            });
        });
    }

    render() {
        return (
            <div>
                <progress value={this.state.uploadValue} max="100">
                    {this.state.uploadValue} %
                </progress>
                <br />
                <input type="file" onChange={this.handleUpload}/>
                <br />
                <img src={this.state.picture} alt="ไม่ขึ้น"/>
            </div>
        );
    }


}
export default FileUpload;