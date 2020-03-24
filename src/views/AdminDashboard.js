import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../firebase';
import UsersBox from '../components/UsersBox';

export class AdminDashboard extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        //if (!this.props.isAdmin) this.props.history.push('/');
        database
            .ref('users')
            .once('value')
            .then(data => data.val())
            .then(users => {
                console.log(users);
            });
    }

    render() {
        return (
            <div className="admin-dash">
                <h1 className="heading-primary">Admin - Lista użytkowników</h1>
                <UsersBox />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, {})(AdminDashboard);
