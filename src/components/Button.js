import React from 'react';

const Button = props => {
    let className = 'btn ';
    if (props.className) className += props.className + ' ';
    if (props.type) className += 'btn--' + props.type + ' ';
    if (props.types)
        props.types.forEach(type => {
            className += 'btn--' + type + ' ';
        });

    return (
        <button onClick={props.onClick} className={className}>
            {props.children}
        </button>
    );
};

export default Button;
