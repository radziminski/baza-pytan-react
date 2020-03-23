import React from 'react';
import { logOut } from '../actions/authActions';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';

const UserMenu = props => {
    return (
        <div className="user-menu">
            <ul className="user-menu__list">
                <li className="user-menu__link">Twoje konto</li>
                <li className="user-menu__link">Zmień hasło</li>
                <li
                    className="user-menu__link"
                    onClick={() => {
                        props.logOut();
                        props.history.push('/');
                    }}
                >
                    Wyloguj się
                </li>
            </ul>
        </div>
    );
};

export default withRouter(connect(null, { logOut })(UserMenu));
