import React from 'react';
import { logOut } from '../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { IoIosLogOut } from 'react-icons/io';
import { MdAccountCircle, MdSettings } from 'react-icons/md';

const UserMenu = props => {
    return (
        <div className="user-menu" onClick={props.onClick}>
            <ul className="user-menu__list">
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
                <li className="user-menu__link">
                    <MdSettings className="user-menu__icon" />
                    Zarządzaj kontem
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

export default withRouter(connect(null, { logOut })(UserMenu));
