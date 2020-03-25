import React, { Component } from 'react';
import { connect } from 'react-redux';
import UsersBox from '../components/UsersBox';

export class AdminDashboard extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        if (!this.props.isAdmin) this.props.history.push('/');
    }

    render() {
        return (
            <div className="admin-dash">
                <h1 className="heading-primary">Zarządzaj użytkownikami</h1>
                <UsersBox />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, {})(AdminDashboard);
