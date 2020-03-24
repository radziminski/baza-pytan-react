import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { MdSettings } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';

export class AccountDashboard extends Component {
    state = {
        editMode: false,
        firstName: '',
        lastName: '',
        city: ''
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        if (!this.props.isAuthenticated) return <Fragment></Fragment>;
        return (
            <Fragment>
                <h1 className="heading-primary">Twoje konto</h1>
                <div className="account-info__box">
                    <div className="account-info__field">
                        <span className="account-info__field-title">Email:</span>{' '}
                        {this.props.user.email}
                    </div>
                    <div className="account-info__field">
                        <span className="account-info__field-title">Imię:</span>{' '}
                        {this.props.user.firstName}
                    </div>
                    <div className="account-info__field">
                        <span className="account-info__field-title">Nazwisko:</span>{' '}
                        {this.props.user.lastName}
                    </div>
                    <div className="account-info__field">
                        <span className="account-info__field-title">Miejsce zamieszkania:</span>{' '}
                        {this.props.user.city}
                    </div>
                    <div className="account-info__field">
                        <span className="account-info__field-title">Status:</span>{' '}
                        {this.props.isAdmin
                            ? 'Admin'
                            : this.props.isPublisher
                            ? 'Recenzent'
                            : 'Użytkownik'}
                    </div>
                    <div className="account-info__btns">
                        <Button type="short">
                            <MdSettings className="account-info__btn-icon" />
                            &emsp;&emsp; Edytuj dane
                        </Button>
                        <Button types={['short', 'delete']}>
                            <TiDelete className="account-info__btn-icon" />
                            &emsp;&emsp; Usuń konto
                        </Button>
                    </div>
                    {/* <h3 className="account-info__field">
                        <span className="account-info__field-title">Konto utworzone:</span>{' '}
                        {Date(this.props.user.createdAt)
                            .toString()
                            .slice(0, 21)}
                    </h3>
                    <h3 className="account-info__field">
                        <span className="account-info__field-title">Ostatnio logowano:</span>{' '}
                        {Date(this.props.user.lastLoginAt)
                            .toString()
                            .slice(0, 21)}
                    </h3> */}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isAdmin: state.auth.isAdmin,
    isPublisher: state.auth.isPublisher
});

export default connect(mapStateToProps, {})(AccountDashboard);
