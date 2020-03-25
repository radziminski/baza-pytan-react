import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { MdSettings } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { deleteUser, updateUser } from '../actions/authActions';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class AccountDashboard extends Component {
    state = {
        editMode: false,
        email: '',
        firstName: '',
        lastName: '',
        city: '',
        showModal: false,
        showMessage: false,
        modalMessage: 'Czy na pewno chcesz USUNĄĆ swoje konto? Tej akcji nie da się cofnąć!',
        edited: false
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
        if (
            this.props.user &&
            this.props.user.email !== this.state.email &&
            !this.state.editMode &&
            !this.state.edited
        ) {
            this.setState({
                ...this.props.user
            });
        }
    }

    componentDidUpdate() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }

        if (
            this.props.user &&
            this.props.user.email !== this.state.email &&
            !this.state.editMode &&
            !this.state.edited
        ) {
            this.setState({
                ...this.props.user
            });
        }
    }

    saveChanges = () => {
        this.props.updateUser(this.props.user, {
            email: this.state.email,
            city: this.state.city,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
        this.setState({ editMode: false, edited: true });
    };

    toggleModal = togg => {
        this.setState({ showModal: togg });
    };

    toggleEditMode = mode => {
        this.setState({ editMode: mode });
    };

    deleteUser = () => {
        this.props.deleteUser(this.props.user);
        this.toggleModal(false);
        this.showMessage(true);
    };

    showMessage = show => {
        this.setState({ showMessage: true });
    };

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value.trim() });
    };

    render() {
        if (!this.props.isAuthenticated) return <Fragment></Fragment>;

        // EDIT MODE
        if (this.state.editMode)
            return (
                <Fragment>
                    <h1 className="heading-primary">Twoje konto</h1>
                    <div className="account-info__box">
                        <div className="account-info__field">
                            <span className="account-info__field-title">Email:</span>{' '}
                            <input
                                className="account-info__input"
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div className="account-info__field">
                            <span className="account-info__field-title">Imię:</span>{' '}
                            <input
                                className="account-info__input"
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div className="account-info__field">
                            <span className="account-info__field-title">Nazwisko:</span>{' '}
                            <input
                                className="account-info__input"
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div className="account-info__field">
                            <span className="account-info__field-title">Miejsce zamieszkania:</span>{' '}
                            <input
                                className="account-info__input"
                                type="text"
                                name="city"
                                value={this.state.city}
                                onChange={this.onInputChange}
                            />
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
                            <Button type="short" onClick={() => this.saveChanges()}>
                                <MdSettings className="account-info__btn-icon" />
                                &emsp;&emsp; Zapisz zmiany
                            </Button>
                            <Button
                                types={['short', 'delete']}
                                onClick={() => this.toggleEditMode(false)}
                            >
                                <TiDelete className="account-info__btn-icon" />
                                &emsp;&emsp; Anuluj
                            </Button>
                        </div>
                    </div>
                    <div className="login__msg">
                        {this.state.showMessage
                            ? this.props.msg.length
                                ? this.props.msg
                                : null
                            : null}
                    </div>

                    <Modal
                        isOpen={this.state.showModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        overlayClassName="modal__overlay"
                        onRequestClose={() => this.toggleModal(false)}
                    >
                        <div className="modal__window">
                            <h2>{this.state.modalMessage}</h2>
                            <div className="modal__btns">
                                <Button type="short" onClick={this.deleteUser}>
                                    Tak
                                </Button>
                                <Button
                                    types={['delete', 'short']}
                                    onClick={() => this.toggleModal(false)}
                                >
                                    Anuluj
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </Fragment>
            );

        // NORMAL MODE
        return (
            <Fragment>
                <h1 className="heading-primary">Twoje konto</h1>
                <div className="account-info__box">
                    <div className="account-info__field">
                        <span className="account-info__field-title">Email:</span> {this.state.email}
                    </div>
                    <div className="account-info__field">
                        <span className="account-info__field-title">Imię:</span>{' '}
                        {this.state.firstName}
                    </div>
                    <div className="account-info__field">
                        <span className="account-info__field-title">Nazwisko:</span>{' '}
                        {this.state.lastName}
                    </div>
                    <div className="account-info__field">
                        <span className="account-info__field-title">Miejsce zamieszkania:</span>{' '}
                        {this.state.city}
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
                        <Button type="short" onClick={() => this.toggleEditMode(true)}>
                            <MdSettings className="account-info__btn-icon" />
                            &emsp;&emsp; Edytuj dane
                        </Button>
                        <Button types={['short', 'delete']} onClick={() => this.toggleModal(true)}>
                            <TiDelete className="account-info__btn-icon" />
                            &emsp;&emsp; Usuń konto
                        </Button>
                    </div>
                </div>
                <div className="login__msg">
                    {this.state.showMessage
                        ? this.props.msg.length
                            ? this.props.msg
                            : null
                        : null}
                </div>

                <Modal
                    isOpen={this.state.showModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="modal__overlay"
                    onRequestClose={() => this.toggleModal(false)}
                >
                    <div className="modal__window">
                        <h2>{this.state.modalMessage}</h2>
                        <div className="modal__btns">
                            <Button type="short" onClick={this.deleteUser}>
                                Tak
                            </Button>
                            <Button
                                types={['delete', 'short']}
                                onClick={() => this.toggleModal(false)}
                            >
                                Anuluj
                            </Button>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isAdmin: state.auth.isAdmin,
    isPublisher: state.auth.isPublisher,
    msg: state.error.msg
});

export default connect(mapStateToProps, { deleteUser, updateUser })(AccountDashboard);
