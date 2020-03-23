import React, { Component, Fragment } from 'react';
import QuestionsFilter from './QuestionsFilter';
import Button from './Button';
import Questions from './Questions';
import { database } from '../firebase';
import AddQestionCard from './AddQestionCard';
import { connect } from 'react-redux';
import { fetchQuestions, deleteQuestion } from '../actions/questionActions';

export class QuestionsBox extends Component {
    state = {
        questions: [],
        filterInput: [],
        addingQuestion: false
    };

    componentDidMount() {
        this.props.fetchQuestions();
    }

    onAddingQuestion = () => {
        this.setState({ addingQuestion: true });
    };

    onEndAddQuestion = () => {
        this.setState({ addingQuestion: false });
    };

    onAddedQuestion = question => {
        this.onEndAddQuestion();
    };

    onFilterChange = input => {
        this.setState({ filterInput: input });
    };

    onDeleteQuestion = id => {
        this.props.deleteQuestion(id);
    };

    render() {
        const btns = <Button onClick={this.onAddingQuestion}>Dodaj pytanie</Button>;
        // const btns = (
        //     <div>
        //         <Button>Dodaj pytanie</Button>
        //         <Button>Załaduj wszystkie pytania</Button>
        //         <Button>Załaduj przykładowe pytania</Button>
        //         <Button>Pobierz wszystkie pytania</Button>
        //     </div>
        // );
        let questionsToRender = this.props.questions.filter(el => {
            if (this.state.filterInput.length === 0) return true;
            if (this.state.filterInput[0].length < 2) return true;
            if (!el.keyWords) return false;
            let flag = false;
            el.keyWords.forEach(keyWord => {
                this.state.filterInput.forEach(key => {
                    if (keyWord.includes(key) && key.length > 1) flag = true;
                });
            });
            return flag;
        });
        let addQuestionCard = null;
        if (this.state.addingQuestion) {
            addQuestionCard = (
                <AddQestionCard
                    onClose={this.onEndAddQuestion}
                    onSubmit={this.onAddedQuestion}
                    databaseRef={database.ref('questions')}
                />
            );
        }

        return (
            <Fragment>
                {/* <h1 className="heading-primary js--heading">Baza pytań</h1> */}
                <QuestionsFilter onChange={this.onFilterChange} />
                <Questions questions={questionsToRender} onDeleteQuestion={this.onDeleteQuestion} />
                {addQuestionCard}
                {btns}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    questions: state.questions.items
});

export default connect(mapStateToProps, { fetchQuestions, deleteQuestion })(QuestionsBox);
