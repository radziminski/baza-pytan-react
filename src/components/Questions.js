import React from 'react';
import QuestionCard from './QuestionCard';
import { Loader } from './Loader';

const Questions = props => {
    const loader = (
        <span className="u-centered">
            <Loader />
        </span>
    );

    const msg = <h3 className="u-centered">Nie znaleziono żadnych pytań.</h3>;

    return (
        <div className="questions-container">
            {props.questions.length === 0 ? (props.showLoader ? loader : msg) : null}

            {props.questions.map(el => (
                <QuestionCard
                    key={el.id}
                    question={el.question}
                    answer={el.answer}
                    keyWords={el.keyWords}
                    onDelete={() => props.onDeleteQuestion(el.id)}
                    isDeletable={el.isDeletable !== false}
                />
            ))}
        </div>
    );
};

export default Questions;
