import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const UserNavBar = props => {
    return (
        <div className="user-nav-bar">
            <ul className="user-nav-bar__list">
                <li className="user-nav-bar__link" onClick={() => props.history.push('/')}>
                    Wszystkie pytania
                </li>
                <li className="user-nav-bar__link">Moje pytania</li>
                {props.isPublisher || props.isAdmin ? (
                    <li
                        className="user-nav-bar__link"
                        onClick={() => props.history.push('/recenzje')}
                    >
                        Pytania do recenzji
                    </li>
                ) : null}
                {props.isAdmin ? (
                    <li className="user-nav-bar__link" onClick={() => props.history.push('/admin')}>
                        Admin
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

export default withRouter(UserNavBar);
