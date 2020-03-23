import React from 'react';

const Button = props => {
    return (
        <button onClick={props.onClick} className="btn btn--full js--add-question">
            {props.children}
        </button>
    );
};

export default Button;
