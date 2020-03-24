import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const UserNavBar = props => {
    return (
        <div className="user-nav-bar">
            {console.log(props.history.location.pathname)}
            <ul className="user-nav-bar__list">
                <li
                    className={`user-nav-bar__link ${
                        props.history.location.pathname === '/'
                            ? 'user-nav-bar__link--active'
                            : null
                    }`}
                    onClick={() => props.history.push('/')}
                >
                    Wszystkie pytania
                </li>
                <li
                    className={`user-nav-bar__link ${
                        props.history.location.pathname === '/prywatne'
                            ? 'user-nav-bar__link--active'
                            : null
                    }`}
                    onClick={() => props.history.push('/prywatne')}
                >
                    Moje pytania
                </li>
                {props.isPublisher || props.isAdmin ? (
                    <li
                        className={`user-nav-bar__link ${
                            props.history.location.pathname === '/recenzje'
                                ? 'user-nav-bar__link--active'
                                : null
                        }`}
                        onClick={() => props.history.push('/recenzje')}
                    >
                        Pytania do recenzji
                    </li>
                ) : null}
                {props.isAdmin ? (
                    <li
                        className={`user-nav-bar__link ${
                            props.history.location.pathname === '/admin'
                                ? 'user-nav-bar__link--active'
                                : null
                        }`}
                        onClick={() => props.history.push('/admin')}
                    >
                        Admin
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

export default withRouter(UserNavBar);
