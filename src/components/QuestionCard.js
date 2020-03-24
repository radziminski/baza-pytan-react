import React, { Fragment } from 'react';
import { MdSettings } from 'react-icons/md';

const QuestionCard = props => {
    const editButtons = (
        <Fragment>
            <button className="question-card__delete-btn" onClick={props.onDelete}>
                <div></div>
            </button>
            <button className="question-card__edit-btn" onClick={props.onEdit}>
                <MdSettings />
            </button>
        </Fragment>
    );

    return (
        <div className="question-card">
            <h2 className="question-card__title">{props.question}</h2>
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
        </div>
    );
};

export default QuestionCard;
