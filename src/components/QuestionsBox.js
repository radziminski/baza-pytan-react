import React, { Component, Fragment } from 'react';
import Filrer from './Filter';
import Button from './Button';
import Questions from './Questions';
import AddQestionCard from './AddQestionCard';
import { connect } from 'react-redux';
import {
    fetchPublicQuestions,
    fetchMyReviewQuestions,
    deleteQuestion,
    fetchAllReviewQuestions,
    createPublicQuestion,
    createReviewQuestion,
    updateQuestion
} from '../actions/questionActions';
import Modal from 'react-modal';
import { FiAlertTriangle } from 'react-icons/fi';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class QuestionsBox extends Component {
    defaultQuestionsPerPage = 4;

    state = {
        filterInput: [],
        addingQuestion: false,
        isFiltering: true,
        numOfQuestions: this.defaultQuestionsPerPage,
        type: 'public',
        editedPosition: null,
        editMode: false,
        showModal: false,
        deletedId: null
    };

    // COMPONENT LIFECYCLE

    componentDidMount() {
        this.loadQuestions(this.props.type);
        if (this.props.type) this.setState({ type: this.props.type });
        // DELETE THIS
    }

    componentDidUpdate() {
        if (this.props.type !== this.state.type) {
            this.setState({ type: this.props.type, isFiltering: this.props.isFetching });
            this.loadQuestions(this.props.type);
            this.resetEditingQuestion();
        } else {
            if (this.state.isFiltering !== this.props.isFetching)
                this.setState({ isFiltering: this.props.isFetching });
        }
    }

    // MODAL
    onShowModal = id => {
        this.setState({ showModal: true, deletedId: id });
    };

    onCloseModal = () => {
        this.setState({ showModal: false, deletedId: null });
    };

    // FETCHING QUESTIONS

    loadQuestions = type => {
        switch (type) {
            case 'private':
                if (!this.props.user) {
                    this.props.history.push('/');
                    return;
                }
                if (this.props.user.uid) this.props.fetchMyReviewQuestions(this.props.user.uid);
                break;
            case 'review':
                if (!this.props.user || !this.props.isPublisher) {
                    this.props.history.push('/');
                    return;
                }
                this.props.fetchAllReviewQuestions();
                break;
            default:
                this.props.fetchPublicQuestions();
        }
        this.resetEditingQuestion();
        this.resetQuestionsNum();
    };

    // ADDING, EDITING, DELETEING NEW QUESTION

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode });
    };

    onAddingQuestion = () => {
        this.setState({ addingQuestion: true });
    };

    onEndAddQuestion = () => {
        this.setState({ addingQuestion: false });
    };

    onAddedQuestion = (question, id = null) => {
        if (!this.props.user || !this.props.user.uid) return;
        if (this.state.type === 'private') {
            !id
                ? this.props.createReviewQuestion(question, this.props.user)
                : this.props.updateQuestion(id, 'reviewQuestions', {
                      ...question,
                      wasDiscarded: false
                  });
        } else if (this.state.type === 'review') {
            this.props.updateQuestion(id, 'reviewQuestions', question);
        } else {
            !id
                ? this.props.createPublicQuestion(question, this.props.user)
                : this.props.updateQuestion(id, 'publicQuestions', question);
        }
        this.onEndAddQuestion();
        this.resetEditingQuestion();
    };

    onDeleteQuestion = id => {
        console.log(id);
        switch (this.state.type) {
            case 'private':
                this.props.deleteQuestion(id, 'reviewQuestions');
                break;
            case 'review':
                if (!this.props.isPublisher) return;
                this.props.deleteQuestion(id, 'reviewQuestions');
                break;
            default:
                if (!this.props.isPublisher) return;
                this.props.deleteQuestion(id, 'publicQuestions');
        }
        this.onCloseModal();
    };

    onEditedQuestion = index => {
        //const position = this.props.questions.findIndex(el => el.id === id);
        this.setState({ editedPosition: index });
    };

    resetEditingQuestion = () => {
        this.setState({ editedPosition: null });
    };

    // REVIEW MODE - CONFIRMING QUESTION

    onConfirmQuestion = id => {
        if (!this.props.user) {
            console.error('Cannot add public question if not a reviewer!');
            return;
        }
        const question = this.props.questions.find(el => el.id === id);
        this.props.deleteQuestion(id, 'reviewQuestions');
        this.props.createPublicQuestion(question, this.props.user, false);
        this.onEndAddQuestion();
        this.resetEditingQuestion();
    };

    onDiscardQuestion = id => {
        if (!this.props.user) {
            console.error('Cannot add public question if not a reviewer!');
            return;
        }
        this.props.updateQuestion(id, 'reviewQuestions', { wasDiscarded: true });
        this.onEndAddQuestion();
        this.resetEditingQuestion();
    };

    // DISPLAYING PROPER NUMBER OF QUESTIONS

    loadMoreQuestions = () => {
        const oldQuestionsNum = this.state.numOfQuestions;
        this.setState({ numOfQuestions: oldQuestionsNum + 3 });
    };

    resetQuestionsNum = () => {
        if (this.state.numOfQuestions !== this.defaultQuestionsPerPage)
            this.setState({ numOfQuestions: this.defaultQuestionsPerPage });
    };

    // FILTERING

    onFilterChange = input => {
        if (input.length && input[0].length > 0) {
            this.setState({
                filterInput: input,
                isFiltering: true,
                numOfQuestions: this.defaultQuestionsPerPage
            });
            return;
        }
        this.setState({
            filterInput: input,
            isFiltering: false,
            numOfQuestions: this.defaultQuestionsPerPage
        });
    };

    render() {
        // FILTERING QUESTIONS
        let questionsToRender = this.props.questions.filter(el => {
            if (this.state.filterInput.length === 0) return true;
            if (this.state.filterInput[0].length < 1) return true;
            let flag = false;
            if (el.keyWords && el.keyWords.forEach)
                el.keyWords.forEach(keyWord => {
                    this.state.filterInput.forEach(key => {
                        if (keyWord.toLowerCase().includes(key.toLowerCase()) && key.length > 0)
                            flag = true;
                    });
                });
            this.state.filterInput.forEach(key => {
                if (
                    el.question &&
                    el.question.toLowerCase().includes(key.toLowerCase()) &&
                    key.length > 0
                )
                    flag = true;
                if (el.number && key.toLowerCase() === el.number + '') flag = true;
            });

            return flag;
        });

        // IF USER IS ADDING QUESTION
        let addQuestionCard = null;
        if (this.state.addingQuestion) {
            addQuestionCard = (
                <AddQestionCard onClose={this.onEndAddQuestion} onSubmit={this.onAddedQuestion} />
            );
        }

        if (this.state.editMode)
            questionsToRender = questionsToRender.map(el => ({ ...el, isDeletable: true }));

        // Mapping objects into components
        let questionsRender = (
            <Questions
                questions={questionsToRender}
                onDeleteQuestion={this.onShowModal}
                onEditQuestion={this.onEditedQuestion}
                showLoader={this.state.isFiltering}
                extended={this.props.type === 'review'}
                onConfirmQuestion={
                    this.props.type === 'review'
                        ? this.onConfirmQuestion
                        : () => {
                              console.error('Cant confirm question if not in reviews mode');
                          }
                }
                onDiscardQuestion={
                    this.props.type === 'review'
                        ? this.onDiscardQuestion
                        : () => {
                              console.error('Cant discard question if not in reviews mode');
                          }
                }
                type={this.props.type}
            />
        );
        if (this.state.editedPosition || this.state.editedPosition === 0) {
            questionsRender = (
                <Questions
                    questions={questionsToRender}
                    onDeleteQuestion={this.onShowModal}
                    onEditQuestion={this.onEditedQuestion}
                    showLoader={this.state.isFiltering}
                    editedPosition={this.state.editedPosition}
                    methods={{
                        onClose: this.resetEditingQuestion,
                        onSubmit: this.onAddedQuestion
                    }}
                    extended={this.props.type === 'review'}
                    onConfirmQuestion={
                        this.props.type === 'review'
                            ? this.onConfirmQuestion
                            : () => {
                                  console.error('Cant confirm question if not in reviews mode');
                              }
                    }
                    onDiscardQuestion={
                        this.props.type === 'review'
                            ? this.onDiscardQuestion
                            : () => {
                                  console.error('Cant discard question if not in reviews mode');
                              }
                    }
                    type={this.props.type}
                />
            );
        }
        let btns = (
            <Button
                onClick={
                    this.state.numOfQuestions >= questionsToRender.length
                        ? () => {}
                        : this.loadMoreQuestions
                }
                className={this.state.numOfQuestions >= questionsToRender.length ? 'btn--grey' : ''}
            >
                Załaduj więcej pytań
            </Button>
        );
        if (this.state.type === 'private')
            btns = (
                <div className="questions-box__btns">
                    <Button onClick={this.onAddingQuestion}>Dodaj pytanie</Button>
                    <Button
                        onClick={
                            this.state.numOfQuestions >= questionsToRender.length
                                ? () => {}
                                : this.loadMoreQuestions
                        }
                        className={
                            this.state.numOfQuestions >= questionsToRender.length ? 'btn--grey' : ''
                        }
                    >
                        Załaduj więcej pytań
                    </Button>
                </div>
            );
        else if (this.state.type !== 'review' && this.props.isPublisher) {
            btns = (
                <div className="questions-box__btns">
                    <Button onClick={() => this.toggleEditMode()}>
                        {this.state.editMode ? 'Wyłącz ' : 'Włącz '}tryb edycji
                    </Button>
                    <Button onClick={this.onAddingQuestion}>Dodaj pytanie</Button>
                    <Button
                        onClick={
                            this.state.numOfQuestions >= questionsToRender.length
                                ? () => {}
                                : this.loadMoreQuestions
                        }
                        className={
                            this.state.numOfQuestions >= questionsToRender.length ? 'btn--grey' : ''
                        }
                    >
                        Załaduj więcej pytań
                    </Button>
                </div>
            );
        }
        if (questionsToRender && questionsToRender.length > this.state.numOfQuestions) {
            questionsToRender.splice(this.state.numOfQuestions);
        }

        return (
            <Fragment>
                {/* <h1 className="heading-primary js--heading">Baza pytań</h1> */}
                <Filrer
                    placeholder="Szukaj pytań po słowach kluczowych..."
                    onChange={this.onFilterChange}
                />
                {questionsRender}
                {addQuestionCard}
                {btns}

                <Modal
                    isOpen={this.state.showModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="modal__overlay"
                    onRequestClose={this.onCloseModal}
                >
                    <div className="modal__window">
                        <div className="modal__icon-box">
                            <FiAlertTriangle className="modal__icon" />
                        </div>
                        <h2 className="modal__msg">Czy na pewno chcesz usunąć pytanie?</h2>
                        <h3 className="modal__msg--small">Tej operacji nie można cofnąć.</h3>
                        <div className="modal__btns">
                            <Button
                                types={['confirm', 'short']}
                                onClick={() => this.onDeleteQuestion(this.state.deletedId)}
                            >
                                Tak
                            </Button>
                            <Button types={['delete', 'short']} onClick={this.onCloseModal}>
                                Anuluj
                            </Button>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    questions: state.questions.items,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isPublisher: state.auth.isPublisher,
    isAdmin: state.auth.isAdmin,
    isFetching: state.questions.isFetching
});

export default connect(mapStateToProps, {
    fetchPublicQuestions,
    deleteQuestion,
    fetchMyReviewQuestions,
    fetchAllReviewQuestions,
    createPublicQuestion,
    createReviewQuestion,
    updateQuestion
})(QuestionsBox);
