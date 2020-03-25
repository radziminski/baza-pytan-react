import React, { Fragment } from 'react';
import { logOut } from '../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { IoIosLogOut } from 'react-icons/io';
import { MdAccountCircle, MdSettings } from 'react-icons/md';
import { FaQuestion } from 'react-icons/fa';

const UserMenu = props => {
    if (window.innerWidth < 800) {
        return (
            <Fragment>
                <div className="user-menu" onClick={props.onClick}>
                    <ul className="user-menu__list">
                        <li className="user-menu__link">
                            {props.firstName} {props.lastName}
                        </li>
                        <li
                            className="user-menu__link"
                            onClick={() => {
                                props.onClick();
                                props.history.push('/');
                            }}
                        >
                            <FaQuestion className="user-menu__icon" />
                            Wszystkie pytania
                        </li>
                        <li
                            className="user-menu__link"
                            onClick={() => {
                                props.onClick();
                                props.history.push('/prywatne');
                            }}
                        >
                            <FaQuestion className="user-menu__icon" />
                            Moje pytania
                        </li>
                        {props.isPublisher ? (
                            <li
                                className="user-menu__link"
                                onClick={() => {
                                    props.onClick();
                                    props.history.push('/recenzje');
                                }}
                            >
                                <FaQuestion className="user-menu__icon" />
                                Pytania do recenzji
                            </li>
                        ) : null}
                        {props.isAdmin ? (
                            <li
                                className="user-menu__link"
                                onClick={() => {
                                    props.onClick();
                                    props.history.push('/admin');
                                }}
                            >
                                <FaQuestion className="user-menu__icon" />
                                Admin
                            </li>
                        ) : null}
                        <li
                            className="user-menu__link"
                            onClick={() => {
                                props.onClick();
                                props.history.push('/account');
                            }}
                        >
                            <MdAccountCircle className="user-menu__icon" />
                            Twoje konto
                        </li>
                        <li
                            className="user-menu__link"
                            onClick={() => {
                                props.onClick();
                                props.history.push('/change');
                            }}
                        >
                            <MdSettings className="user-menu__icon" />
                            Zmień hasło
                        </li>
                        <li
                            className="user-menu__link"
                            onClick={() => {
                                props.logOut();
                                props.onClick();
                                props.history.push('/');
                            }}
                        >
                            <IoIosLogOut className="user-menu__icon" /> Wyloguj się
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    }
    return (
        <div className="user-menu" onClick={props.onClick}>
            <ul className="user-menu__list">
                <li className="user-menu__link">
                    {props.firstName} {props.lastName}
                </li>
                <li
                    className="user-menu__link"
                    onClick={() => {
                        props.onClick();
                        props.history.push('/account');
                    }}
                >
                    <MdAccountCircle className="user-menu__icon" />
                    Twoje konto
                </li>
                <li
                    className="user-menu__link"
                    onClick={() => {
                        props.onClick();
                        props.history.push('/change');
                    }}
                >
                    <MdSettings className="user-menu__icon" />
                    Zmień hasło
                </li>
                <li
                    className="user-menu__link"
                    onClick={() => {
                        props.logOut();
                        props.onClick();
                        props.history.push('/');
                    }}
                >
                    <IoIosLogOut className="user-menu__icon" /> Wyloguj się
                </li>
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName,
    isPublisher: state.auth.isPublisher,
    isAdmin: state.auth.isAdmin
});

export default withRouter(connect(mapStateToProps, { logOut })(UserMenu));
