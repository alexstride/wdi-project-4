import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FormatDate from '../../lib/FormatDate';

const HomeworkIndexCard = ({ name, link, hasBeenSubmitted, setDate, onClick, dueDate }) => {
  const cardClasses = classNames('homework-index-card', {
    'is-submitted': hasBeenSubmitted
  });
  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="index-card-header">
        <Link className="card-title" to={link}>{name}</Link>
        {hasBeenSubmitted && <small className="index-card-status">Submitted</small>}
        {!hasBeenSubmitted && <small className="index-card-status">Unsubmitted</small>}
      </div>
      <div>
        <p>Set: {FormatDate.getDDMMYYY(setDate)}</p>
        {dueDate && <p>Due: {FormatDate.getDDMMYYY(dueDate)}</p>}
      </div>
    </div>
  );
};

export default HomeworkIndexCard;
