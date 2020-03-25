import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { MdSettings } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { deleteUser } from '../actions/authActions';
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
        firstName: '',
        lastName: '',
        city: '',
        showModal: false,
        modalMessage: 'Czy na pewno chcesz USUNĄĆ swoje konto? Tej akcji nie da się cofnąć!'
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    toggleModal = (togg = true) => {
        this.setState({ showModal: togg });
    };

    deleteUser = () => {
        this.props.deleteUser(this.props.user);
    };

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
                        <Button types={['short', 'delete']} onClick={this.toggleModal}>
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
                {console.log(this.state.showModal)}
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
    isPublisher: state.auth.isPublisher
});

export default connect(mapStateToProps, { deleteUser })(AccountDashboard);
