import React, { Component, Fragment } from 'react';
import Filrer from './Filter';
import Button from './Button';
import Questions from './Questions';
import { database, backendFunctions } from '../firebase';
import AddQestionCard from './AddQestionCard';
import { connect } from 'react-redux';
import { fetchQuestions, deleteQuestion } from '../actions/questionActions';

export class QuestionsBox extends Component {
    defaultQuestionsPerPage = 4;

    state = {
        filterInput: [],
        addingQuestion: false,
        isFiltering: false,
        numOfQuestions: this.defaultQuestionsPerPage
    };

    componentDidMount() {
        this.props.fetchQuestions();

        // DELETE THIS
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

    loadMoreQuestions = () => {
        const oldQuestionsNum = this.state.numOfQuestions;
        this.setState({ numOfQuestions: oldQuestionsNum + 3 });
    };

    resetQuestionsNum = () => {
        if (this.state.numOfQuestions !== this.defaultQuestionsPerPage)
            this.setState({ numOfQuestions: this.defaultQuestionsPerPage });
    };

    onFilterChange = input => {
        if (input.length && input[0].length > 1) {
            this.setState({ filterInput: input, isFiltering: true });
            return;
        }
        this.setState({ filterInput: input, isFiltering: false });
    };

    onDeleteQuestion = id => {
        this.props.deleteQuestion(id);
    };

    render() {
        let btns = (
            <Button
                onClick={this.loadMoreQuestions}
                className={
                    this.state.numOfQuestions >= this.props.questions.length ? 'btn--grey' : ''
                }
            >
                Załaduj więcej pytań
            </Button>
        );
        if (this.props.isAuthenticated)
            btns = (
                <div className="questions-box__btns">
                    <Button onClick={this.onAddingQuestion}>Dodaj pytanie</Button>
                    <Button
                        onClick={this.loadMoreQuestions}
                        className={
                            this.state.numOfQuestions >= this.props.questions.length
                                ? 'btn--grey'
                                : ''
                        }
                    >
                        Załaduj więcej pytań
                    </Button>
                </div>
            );
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
            this.resetQuestionsNum();
            let flag = false;
            if (el.keyWords)
                el.keyWords.forEach(keyWord => {
                    this.state.filterInput.forEach(key => {
                        if (keyWord.toLowerCase().includes(key.toLowerCase()) && key.length > 1)
                            flag = true;
                    });
                });
            this.state.filterInput.forEach(key => {
                if (el.question.toLowerCase().includes(key.toLowerCase()) && key.length > 1)
                    flag = true;
            });

            return flag;
        });
        if (questionsToRender && questionsToRender.length > this.state.numOfQuestions) {
            questionsToRender.splice(this.state.numOfQuestions);
        }
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
                <Filrer
                    placeholder="Szukaj pytań po słowach kluczowych..."
                    onChange={this.onFilterChange}
                />
                <Questions
                    questions={questionsToRender}
                    onDeleteQuestion={this.onDeleteQuestion}
                    showLoader={!this.state.isFiltering}
                />
                {addQuestionCard}
                {btns}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    questions: state.questions.items,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    fetchQuestions,
    deleteQuestion
})(QuestionsBox);
