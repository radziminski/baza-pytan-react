import React from 'react';

const QuestionCard = props => {
    const deleteButton = (
        <button className="question-card__delete-btn" onClick={props.onDelete}>
            <div></div>
        </button>
    );

    return (
        <div className="question-card" id={props.id}>
            <h2 className="question-card__title">{props.question}</h2>
            <p className="question-card__answer">{props.answer}</p>
            <div className="question-card__key-words-title">Słowa kluczowe:</div>
            <div className="question-card__key-words">
                {props.keyWords && props.keyWords.length > 0 ? (
                    props.keyWords.map(el => {
                        if (!el || el.length < 1) return null;
                        return (
                            <div key={el} className="question-card__key-word">
                                {el}
                            </div>
                        );
                    })
                ) : (
                    <div className="question-card__key-word--default">Brak słów kluczowych</div>
                )}
            </div>
            {props.isDeletable ? deleteButton : null}
        </div>
    );
};

export default QuestionCard;
