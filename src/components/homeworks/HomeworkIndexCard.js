import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FormatDate from '../../lib/FormatDate';

const HomeworkIndexCard = ({ name, link, hasBeenSubmitted, setDate, onClick }) => {
  const classes = classNames('homework-index-card', {
    'is-submitted': hasBeenSubmitted
  });
  return (
    <div className={classes} onClick={onClick}>
      <div className="index-card-header">
        <Link className="card-title" to={link}>{name}</Link>
        {hasBeenSubmitted && <small className="index-card-status">Submitted</small>}
        {!hasBeenSubmitted && <small className="index-card-status">Unsubmitted</small>}
      </div>
      <p className="index-card-setdate">{FormatDate.getDDMMYYY(setDate)}</p>
    </div>
  );
};

export default HomeworkIndexCard;
