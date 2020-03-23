import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/questionActions';

export class AddQestionCard extends Component {
    state = {
        question: '',
        answer: '',
        keyWordsString: '',
        keyWords: []
    };

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
        const question = {
            id: 1,
            question: this.state.question,
            answer: this.state.answer,
            keyWords: this.state.keyWords
        };

        this.props.createQuestion(question);
        this.props.onSubmit();
        //const newQuestionRef = this.props.databaseRef.push();
        // newQuestionRef
        //     .set({
        //         question: question.question,
        //         answer: question.answer,
        //         keyWords: question.keyWords
        //     })
        //     .then(data => {
        //         question.id = newQuestionRef.key;
        //         this.props.onSubmit(question);
        //     })
        //     .catch(err => {
        //         window.alert('Nie udało się wysłać pytania. Error: ' + err);
        //     });
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

export default connect(null, { createQuestion })(AddQestionCard);
