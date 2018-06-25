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
        var tempThis = this;
        var file = event.target.files[0];
        var storageRef = firebase.storage().ref(`/filepond/${file.name}`);
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
    render() {
        const { picture } = this.state;
        return (
            <div>
                <progress value={this.state.uploadValue} max="100">
                    {this.state.uploadValue} %
                </progress>
                <br />

                <input type="file" onChange={this.handleUpload} />
                <br />
                <img src={picture} alt="" />
            </div>
        );
    }
}
export default FileUpload;