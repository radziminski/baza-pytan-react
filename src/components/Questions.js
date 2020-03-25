import React from 'react';
import QuestionCard from './QuestionCard';
import { Loader } from './Loader';
import AddQestionCard from './AddQestionCard';

const Questions = props => {
    const loader = (
        <span className="u-centered">
            <Loader />
        </span>
    );

    const msg = <h3 className="u-centered">Nie znaleziono żadnych pytań.</h3>;
    const msg2 = <h3 className="u-centered">Nie ma żadnych pytań.</h3>;

    return (
        <div className="questions-container">
            {/* {props.questions.length === 0 ? (props.showLoader ? loader : msg) : null} */}
            {props.showLoader
                ? loader
                : props.questions.length === 0
                ? msg
                : props.questions.map((el, index) => {
                      if (props.editedPosition === index) {
                          return (
                              <AddQestionCard
                                  question={el.question}
                                  answer={el.answer}
                                  keyWords={el.keyWords}
                                  key={el.id}
                                  onClose={props.methods.onClose}
                                  onSubmit={question => props.methods.onSubmit(question, el.id)}
                                  author={props.extended ? el.creator : null}
                              />
                          );
                      }
                      if (props.extended) {
                          return (
                              <QuestionCard
                                  key={el.id}
                                  id={el.id}
                                  question={el.question}
                                  answer={el.answer}
                                  keyWords={el.keyWords}
                                  onDelete={() => props.onDeleteQuestion(el.id)}
                                  onEdit={() => props.onEditQuestion(el.id)}
                                  onConfirm={() => props.onConfirmQuestion(el.id)}
                                  isDeletable={el.isDeletable !== false}
                                  author={el.creator}
                                  number={el.number}
                              />
                          );
                      }
                      return (
                          <QuestionCard
                              key={el.id}
                              id={el.id}
                              question={el.question}
                              answer={el.answer}
                              keyWords={el.keyWords}
                              onDelete={() => props.onDeleteQuestion(el.id)}
                              onEdit={() => props.onEditQuestion(el.id)}
                              isDeletable={el.isDeletable !== false}
                              number={el.number}
                          />
                      );
                  })}
        </div>
    );
};

export default Questions;
