import React, { Fragment } from 'react';
import { MdSettings } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';

const QuestionCard = props => {
    const editButtons = (
        <Fragment>
            <button className="question-card__delete-btn" onClick={props.onDelete}>
                <MdDeleteForever className="question-card__delete-icon" />
            </button>
            <button className="question-card__edit-btn" onClick={props.onEdit}>
                <MdSettings />
            </button>
        </Fragment>
    );

    let author = null;
    let confirmBtns = null;
    if (props.author) {
        author = (
            <h3 className="question-card__author">
                Autor:&nbsp;&nbsp;
                {props.author.firstName +
                    ' ' +
                    props.author.lastName +
                    ' (' +
                    props.author.email +
                    ')'}
            </h3>
        );
        confirmBtns = (
            <div className="question-card__confirm-btns">
                <button className="question-card__confirm-btn" onClick={props.onConfirm}>
                    Zatwierdź
                </button>
                <button
                    onClick={props.onDiscard}
                    className="question-card__confirm-btn question-card__confirm-btn--delete"
                >
                    Odrzuć
                </button>
            </div>
        );
    }

    let discardedLabel = null;
    if (props.wasDiscarded)
        discardedLabel = <div className="question-card__discarded">Odrzucono</div>;

    return (
        <div className="question-card">
            {author}
            <h2
                className={`question-card__title ${
                    props.wasDiscarded ? 'question-card__title--discarded' : ''
                }`}
            >
                {props.number ? props.number + '. ' : null}
                {props.question.length
                    ? props.question[0].toUpperCase() + props.question.slice(1)
                    : '---'}
            </h2>
            <p className="question-card__answer">{props.answer}</p>
            <div className="question-card__key-words-title">Słowa kluczowe:</div>
            <div className="question-card__key-words">
                {props.keyWords && props.keyWords.map && props.keyWords.length > 0 ? (
                    props.keyWords.map((el, index) => {
                        if (!el || el.length < 1) return null;
                        return (
                            <div key={el + '' + index} className="question-card__key-word">
                                {el}
                            </div>
                        );
                    })
                ) : (
                    <div className="question-card__key-word--default">Brak słów kluczowych</div>
                )}
            </div>
            {props.isDeletable ? editButtons : null}
            {confirmBtns}
            {discardedLabel}
        </div>
    );
};

export default QuestionCard;
