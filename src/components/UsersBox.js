import React, { Component } from 'react';
import { database } from '../firebase';
import { IoMdPerson } from 'react-icons/io';
import { FaBookReader, FaAngleDoubleDown } from 'react-icons/fa';
import {
    addPublisher,
    removePublisher,
    addAdmin,
    removeAdmin,
    deleteUser
} from '../actions/authActions';
import { connect } from 'react-redux';
import Button from './Button';
import Filter from './Filter';
import { Loader } from './Loader';
import Modal from 'react-modal';
import { MdDeleteForever, MdStar, MdSettings } from 'react-icons/md';

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export class UsersBox extends Component {
    defaultUsersPerPage = 5;

    state = {
        users: [],
        numOfUsers: 5,
        filterInput: [],
        isFiltering: false,
        isLoading: true,
        showModal: false,
        currentUser: null,
        modalMessage: '',
        upgrading: true
    };

    componentDidMount() {
        database.ref('users').on('value', data => {
            const newUsers = [];
            const users = data.val();
            for (let user in users) {
                const newUser = {
                    firstName: users[user].firstName,
                    lastName: users[user].lastName,
                    email: users[user].email,
                    city: users[user].city,
                    phone: users[user].phone,
                    id: user,
                    isPublisher: users[user].isPublisher === true,
                    isAdmin: users[user].isAdmin === true
                };
                newUsers.push(newUser);
            }
            this.setState({ users: newUsers, isLoading: false });
        });
    }

    loadMoreUsres = () => {
        const oldUsersNum = this.state.numOfUsers;
        this.setState({ numOfUsers: oldUsersNum + 5 });
    };

    resetUsersNum = () => {
        if (this.state.numOfUsers !== this.defaultUsersPerPage)
            this.setState({ numOfUsers: this.defaultUsersPerPage });
    };

    onFilterChange = input => {
        if (input.length && input[0].length > 1) {
            this.setState({ filterInput: input, isFiltering: true });
            return;
        }
        this.setState({ filterInput: input, isFiltering: false });
    };

    onDeleteUser = id => {
        window.alert(
            'Niestety funkcja usuwania użytkowników nie została jak na razie aktywowana. W celu usunięcia użytkownika skontaktuj się z administratorem.'
        );
        this.setState({ isLoading: false, showModal: false });
    };

    onDowngradeUser = user => {
        this.setState({ isLoading: true, showModal: false });
        if (user.isAdmin) this.props.removeAdmin(user.email, user.id);
        else if (user.isPublisher) this.props.removePublisher(user.email, user.id);
        else this.onDeleteUser();
    };

    onUpgradeUser = user => {
        this.setState({ isLoading: true, showModal: false });
        if (user.isAdmin) return;
        if (user.isPublisher) this.props.addAdmin(user.email, user.id);
        else this.props.addPublisher(user.email, user.id);
    };

    onConfirmUpgradeUser = id => {
        const user = this.state.users.find(el => el.id === id);
        let msg = `Czy na pewno chcesz mianować ${user.firstName} ${user.lastName} recenzentem?`;
        if (user.isPublisher)
            msg = `Czy na pewno chcesz mianować ${user.firstName} ${user.lastName} administratorem?`;
        this.setState({
            showModal: true,
            currentUser: { ...user },
            modalMessage: msg,
            upgrading: true
        });
    };

    onConfirmDowngradeUser = id => {
        const user = this.state.users.find(el => el.id === id);
        let msg = `Czy na pewno chcesz USUNĄĆ użytkownika ${user.firstName} ${user.lastName}?`;
        if (user.isAdmin)
            msg = `Czy na pewno chcesz usunąć status ADMINISTRATORA użytkownikowi ${user.firstName} ${user.lastName}?`;
        else if (user.isPublisher)
            msg = `Czy na pewno chcesz usunąć status recenzenta użytkownikowi ${user.firstName} ${user.lastName}?`;

        this.setState({
            showModal: true,
            currentUser: { ...user },
            modalMessage: msg,
            upgrading: false
        });
    };

    onCloseModal = () => {
        this.setState({ showModal: false });
        this.setState({ currentUser: null });
    };

    componentWillUnmount() {
        database.ref('users').off();
    }

    render() {
        const usersToRender = this.state.users
            .filter(el => el.email !== this.props.myEmail)
            .filter(el => {
                if (!this.state.isFiltering) return true;
                this.resetUsersNum();
                let flag = false;
                this.state.filterInput.forEach(key => {
                    if (el.firstName.toLowerCase().includes(key.toLowerCase()) && key.length > 1)
                        flag = true;
                    if (el.lastName.toLowerCase().includes(key.toLowerCase()) && key.length > 1)
                        flag = true;
                    if (el.email.toLowerCase().includes(key.toLowerCase()) && key.length > 1)
                        flag = true;
                    if (el.city.toLowerCase().includes(key.toLowerCase()) && key.length > 1)
                        flag = true;
                });
                return flag;
            })
            .slice(0, this.state.numOfUsers)
            .map(el => (
                <div key={el.id} id={el.id} className="users-box__user">
                    <div className="users-box__user-icon-box">
                        <div className="users-box__user-icon-container">
                            {el.isAdmin ? (
                                <MdSettings className="users-box__user-icon" />
                            ) : el.isPublisher ? (
                                <FaBookReader className="users-box__user-icon" />
                            ) : (
                                <IoMdPerson className="users-box__user-icon" />
                            )}
                        </div>
                    </div>
                    <div className="users-box__user-info-box">
                        <div className="users-box__user-name">
                            {el.firstName} {el.lastName}
                        </div>
                        <div className="users-box__user-info">
                            <div className="users-box__user-info-field">
                                Email: &emsp;
                                {el.email}
                            </div>
                            <div className="users-box__user-info-field">
                                Miasto:&emsp;
                                {el.city}
                            </div>
                            <div className="users-box__user-info-field">
                                Status:&emsp;
                                {el.isAdmin
                                    ? 'Administrator'
                                    : el.isPublisher
                                    ? 'Recenzent'
                                    : 'Użytkownik'}
                            </div>
                        </div>
                    </div>
                    <div className="users-box__btns">
                        <button
                            className={`users-box__btn ${
                                el.isAdmin
                                    ? 'users-box__btn--disabled'
                                    : el.isPublisher
                                    ? 'users-box__btn--premium'
                                    : 'users-box__btn--confirm'
                            }`}
                            onClick={() => this.onConfirmUpgradeUser(el.id)}
                        >
                            <MdStar className="users-box__btn-icon" />
                        </button>
                        <button
                            className={'users-box__btn users-box__btn--delete'}
                            onClick={() => this.onConfirmDowngradeUser(el.id)}
                        >
                            {el.isAdmin || el.isPublisher ? (
                                <FaAngleDoubleDown className="users-box__btn-icon" />
                            ) : (
                                <MdDeleteForever className="users-box__btn-icon" />
                            )}
                        </button>
                    </div>
                </div>
            ));

        return (
            <div className="users-box">
                <Modal
                    isOpen={this.state.showModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="modal__overlay"
                    onRequestClose={this.onCloseModal}
                >
                    <div className="modal__window">
                        <h2>{this.state.modalMessage}</h2>
                        <div className="modal__btns">
                            <Button
                                type="short"
                                onClick={() =>
                                    this.state.upgrading
                                        ? this.onUpgradeUser(this.state.currentUser)
                                        : this.onDowngradeUser(this.state.currentUser)
                                }
                            >
                                Tak
                            </Button>
                            <Button types={['delete', 'short']} onClick={this.onCloseModal}>
                                Anuluj
                            </Button>
                        </div>
                    </div>
                </Modal>
                <Filter placeholder="Szukaj użytkowników" onChange={this.onFilterChange} />
                {this.state.isLoading ? (
                    <div className="u-centered">
                        <Loader />
                    </div>
                ) : (
                    usersToRender
                )}
                <Button
                    type="long"
                    onClick={this.loadMoreUsres}
                    className={this.state.numOfUsers > this.state.users.length ? 'btn--grey' : ''}
                >
                    Załaduj więcej uzytkowników
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    myEmail: state.auth.user ? state.auth.user.email : ''
});

export default connect(mapStateToProps, {
    addPublisher,
    removePublisher,
    addAdmin,
    removeAdmin,
    deleteUser
})(UsersBox);
