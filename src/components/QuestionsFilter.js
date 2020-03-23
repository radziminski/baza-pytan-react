import React, { Component } from 'react';
import { GoSearch } from 'react-icons/go';

export class QuestionsFilter extends Component {
    state = {
        value: ''
    };

    onChange = e => {
        this.setState({ value: e.target.value });
        const inputs = e.target.value.split(',').map(el => el.trim());
        this.props.onChange(inputs);
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
                    placeholder="Wyszukaj po słowach kluczowych oddzielonych przecinkami..."
                    onChange={this.onChange}
                    value={this.state.value}
                />
            </div>
        );
    }
}

export default QuestionsFilter;
