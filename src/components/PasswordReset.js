import React, { Component } from 'react';
import LoginTextInput from './LoginTextInput.js';
import { IoMdLock } from 'react-icons/io';
import { connect } from 'react-redux';
import { changePassword } from '../actions/authActions';
import { Loader } from './Loader';
import Modal from 'react-modal';
import Button from './Button.js';

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

export class PasswordReset extends Component {
    state = {
        passFirst: '',
        passSecond: '',
        showModal: false
    };

    componentDidUpdate() {
        if (!this.props.user) this.props.history.push('/');
    }

    onInputChange = e => {
        if (e.target) this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.changePassword(
            this.props.user,
            this.state.passFirst,
            this.state.passSecond,
            () => this.setState({ showModal: true })
        );
    };

    redirect = () => {
        this.props.history.push('/');
    };

    render() {
        let loading = (
            <div className="u-centered">
                <Loader />
            </div>
        );
        if (!this.props.isLoading)
            loading = this.props.errorMsg.length ? (
                <h3 className="login__msg">{this.props.errorMsg}</h3>
            ) : null;

        return (
            <form className="login" onSubmit={this.onSubmit}>
                <h2 className="login__title">Zmień hasło</h2>
                <LoginTextInput
                    type="password"
                    id="passFirst"
                    placeholder="Nowe hasło"
                    onChange={this.onInputChange}
                    label="Nowe hasło:"
                    icon={<IoMdLock className="login__icon" />}
                    required
                />
                <LoginTextInput
                    type="password"
                    id="passSecond"
                    placeholder="Nowe hasło"
                    onChange={this.onInputChange}
                    label="Powtórz nowe hasło:"
                    icon={<IoMdLock className="login__icon" />}
                    required
                />
                {loading}
                <button type="submit" className="btn btn--full">
                    Zmień
                </button>

                <Modal
                    isOpen={this.state.showModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="modal__overlay"
                    onRequestClose={this.redirect}
                >
                    {' '}
                    <div className="modal__window">
                        <h2>Pomyślnie zmieniono hasło!</h2>
                        <div className="u-centered">
                            <Button types={['confirm', 'short']} onClick={this.redirect}>
                                Wróć do strony głównej
                            </Button>
                        </div>
                    </div>
                </Modal>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    errorMsg: state.error.msg,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { changePassword })(PasswordReset);
