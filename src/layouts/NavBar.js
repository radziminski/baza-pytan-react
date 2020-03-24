import React, { Component, Fragment } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdPerson, IoMdSettings } from 'react-icons/io';
import UserMenu from '../components/UserMenu';
import UserNavBar from './UserNavBar';

export class NavBar extends Component {
    state = {
        icon: false,
        showUserMenu: false,
        sticked: false
    };

    componentDidMount() {
        // window.addEventListener('scroll', () => {
        //     if (window.scrollY * 1 > 50) this.setState({ sticked: true });
        //     else this.setState({ sticked: false });
        //     console.log(window.innerWidth);
        // });
        // window.addEventListener('click', () => {
        //     if (this.state.showUserMenu) this.hideUserMenu();
        // });
    }

    changeIcon = () => {
        this.setState({ icon: !this.state.icon });
    };

    showUserMenu = () => {
        this.setState({ showUserMenu: true });
    };

    hideUserMenu = () => {
        this.setState({ showUserMenu: false });
    };

    render() {
        let userMenu = null;
        if (this.state.showUserMenu) {
            userMenu = <UserMenu onClick={() => this.hideUserMenu()} />;
        }

        let rightCorner = (
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn btn--full btn--small">Zaloguj się</button>
            </Link>
        );

        if (this.props.isAuth) {
            rightCorner = (
                <div className="nav-bar__user">
                    <UserNavBar isAdmin={this.props.isAdmin} isPublisher={this.props.isPublisher} />
                    <button
                        className="nav-bar__login-btn"
                        onMouseEnter={() => this.changeIcon()}
                        onMouseLeave={() => this.changeIcon()}
                        onClick={this.state.showUserMenu ? this.hideUserMenu : this.showUserMenu}
                    >
                        {this.state.icon ? (
                            <IoMdSettings className="nav-bar__login-icon" />
                        ) : (
                            <IoMdPerson className="nav-bar__login-icon" />
                        )}
                        {userMenu}
                    </button>
                </div>
            );
        }

        return (
            <Fragment>
                <header className={'nav-bar ' + (this.state.sticked ? 'nav-bar--sticked' : '')}>
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
                {this.state.showUserMenu ? (
                    <div className="modal" onClick={this.hideUserMenu}></div>
                ) : null}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    isPublisher: state.auth.isPublisher
});

export default connect(mapStateToProps, {})(NavBar);
