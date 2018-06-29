import React, { Component } from 'react';
import firebase, { auth } from './config';
import {
    CardText,
    CardTitle,
    CardSubtitle,
} from 'reactstrap';
import './Task.css';
import picfarm from './Picture/picfarm.jpg';
import './Delete.css';
import EditModal from './EditModal';

class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            modalEdit: false,
            modalDDelete: false,
            user: this.props.user

        }
        this.modalEdittoggle = this.modalEdittoggle.bind(this);
        this.modalDeletetoggle = this.modalDeletetoggle.bind(this);
    }

    modalEdittoggle(item) {
        this.setState({
            modalEdit: !this.state.modalEdit,
        });
    }

    modalDeletetoggle(item) {
        this.setState({
            modalEdit: !this.state.modalDelete,
        });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
        firebase.database().ref('item').orderByChild('startDate').on('value', (snapshot) => {
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
                    user: childData.user,
                    picture: childData.picture
                });
            });
            this.setState({
                items: newState
            });
        });
    }

    render() {
        return (
            <div class="TaskCard">
                {this.state.items.map((item) => {
                    return (
                        <div>
                            {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                                <div>
                                    <div class="card2">
                                        {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                                            <div>
                                                <img src={item.picture || picfarm} className="pic" alt="Card image" />
                                            </div> : null}
                                        <div class="Tcontainer">
                                            <br />
                                            <div class="block2">
                                                <EditModal
                                                    taskName={item.taskName}
                                                    description={item.description}
                                                    startDate={item.startDate}
                                                    endDate={item.endDate}
                                                    id={item.id}
                                                    picture={item.picture}
                                                    modalEdittoggle={this.modalEdittoggle}
                                                    modalDeletetoggle={this.modalDeletetoggle}
                                                />
                                            </div>
                                            <CardTitle>{item.taskName}</CardTitle>
                                            <CardText>{item.description}</CardText>
                                            <CardSubtitle>{item.startDate} - {item.endDate}</CardSubtitle>
                                            <br />
                                        </div>
                                    </div>
                                    <br />
                                </div> : null}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default TaskCard;