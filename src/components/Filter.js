import React, { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import { MdClose } from 'react-icons/md';

export class Filter extends Component {
    state = {
        value: '',
        showClose: false
    };

    onChange = e => {
        const inputs = e.target.value.split(',').map(el => el.trim());
        this.props.onChange(inputs);
        if (e.target.value.length > 1) this.setState({ value: e.target.value, showClose: true });
        else this.setState({ value: e.target.value, showClose: false });
    };

    resetFilter = () => {
        this.setState({ value: '', showClose: false });
        this.props.onChange([]);
    };

    render() {
        return (
            <div className="filter">
                <div className="filter__text">
                    <GoSearch className="filter__icon" /> Szukaj!{' '}
                </div>
                <input
                    className="filter__input js--filter-input"
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    value={this.state.value}
                />
                {this.state.showClose ? (
                    <MdClose className="filter__close" onClick={this.resetFilter} />
                ) : null}
            </div>
        );
    }
}

export default Filter;
