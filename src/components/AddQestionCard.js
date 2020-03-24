import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AddQestionCard extends Component {
    state = {
        question: '',
        answer: '',
        keyWordsString: '',
        keyWords: []
    };

    setInputsFromProps = () => {
        this.setState({
            question: this.props.question || '',
            answer: this.props.answer || '',
            keyWordsString: this.props.keyWords
                ? this.props.keyWords.join
                    ? this.props.keyWords.join(',')
                    : ''
                : '',
            keyWords: this.props.keyWords || []
        });
    };

    componentDidMount() {
        this.setInputsFromProps();
    }

    componentDidUpdate() {
        if (
            !this.state.question &&
            !this.state.answer &&
            !this.state.keyWordsString &&
            (this.props.question || this.props.answer || this.props.keyWords)
        )
            this.setInputsFromProps();
    }

    onInputChange = (e, inputType) => {
        this.setState({ [inputType]: e.target.value });
    };

    onKeyWordsChange = e => {
        const keyWordsArr = e.target.value.split(',').map(el => el.trim());
        this.setState({
            keyWordsString: e.target.value,
            keyWords: keyWordsArr
        });
    };

    onSubmit = e => {
        e.preventDefault();
        if (!this.props.user) {
            console.error('Cant send question if not logged in!');
            return;
        }
        const question = {
            question: this.state.question,
            answer: this.state.answer,
            keyWords: this.state.keyWords
        };

        this.props.onSubmit(question);
    };

    render() {
        return (
            <form className="question-card" onSubmit={this.onSubmit}>
                <input
                    className="question-card__title question-card__title--input"
                    placeholder="Treść pytania..."
                    value={this.state.question}
                    onChange={e => this.onInputChange(e, 'question')}
                    required
                />
                <textarea
                    className="question-card__answer question-card__answer--input"
                    placeholder="Treść odpowiedzi..."
                    value={this.state.answer}
                    onChange={e => this.onInputChange(e, 'answer')}
                    required
                />
                <div className="question-card__key-words-title">Słowa kluczowe:</div>
                <textarea
                    className="question-card__key-words question-card__key-words--input"
                    placeholder="Słowa kluczowe oddzielone przecinkami"
                    onChange={this.onKeyWordsChange}
                    value={this.state.keyWordsString}
                />
                <button className="question-card__btn" type="submit">
                    Wyślij!
                </button>
                <button className="question-card__delete-btn" onClick={this.props.onClose}>
                    <div></div>
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(AddQestionCard);
