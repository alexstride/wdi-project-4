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
      <Link className="card-title" to={link}>{name}</Link>
      <p className="index-card-setdate">{FormatDate.getDDMMYYY(setDate)}</p>
    </div>
  );
};

export default HomeworkIndexCard;
