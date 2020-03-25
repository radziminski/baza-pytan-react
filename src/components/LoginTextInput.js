import React, { Component } from 'react';

export class LoginTextInput extends Component {
    state = {
        value: ''
    };

    onChange = e => {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    };

    render() {
        return (
            <div
                className={`login__input-box ${
                    this.props.classType ? 'login__input-box--' + this.props.classType : ''
                }`}
            >
                <input
                    type={this.props.type}
                    className="login__input"
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    value={this.state.value}
                    name={this.props.id}
                    required={this.props.required}
                />
                <label htmlFor={this.props.id} className="login__label">
                    {this.props.label}
                </label>
                {this.props.icon}
            </div>
        );
    }
}

export default LoginTextInput;
