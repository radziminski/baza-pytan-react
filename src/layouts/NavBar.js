import React, { Component } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdPerson, IoMdSettings } from 'react-icons/io';
import UserMenu from '../components/UserMenu';

export class NavBar extends Component {
    state = {
        icon: false,
        showUserMenu: false
    };

    changeIcon = () => {
        this.setState({ icon: !this.state.icon });
    };

    showUserMenu = () => {
        this.setState({ showUserMenu: true });
    };

    hideUserMenu = () => {
        if (this.state.showUserMenu) this.setState({ showUserMenu: false });
    };

    render() {
        let userMenu = null;
        if (this.state.showUserMenu) {
            userMenu = <UserMenu />;
        }

        let rightCorner = (
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn btn--full btn--small">Zaloguj się</button>
            </Link>
        );

        if (this.props.isAuth) {
            rightCorner = (
                <button
                    className="nav-bar__login-btn"
                    onMouseEnter={() => this.changeIcon()}
                    onMouseLeave={() => this.changeIcon()}
                    onClick={this.showUserMenu}
                >
                    {this.state.icon ? (
                        <IoMdSettings className="nav-bar__login-icon" />
                    ) : (
                        <IoMdPerson className="nav-bar__login-icon" />
                    )}
                    {userMenu}
                </button>
            );
        }

        return (
            <header className="nav-bar" onClick={this.hideUserMenu}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="logo">
                        <div className="logo__img">
                            <FaQuestion className="logo__icon" />
                        </div>
                        <div className="logo__text">Baza Pytań</div>
                    </div>
                </Link>

                {rightCorner}
            </header>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(NavBar);
