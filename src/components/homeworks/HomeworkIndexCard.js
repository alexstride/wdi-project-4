import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const HomeworkIndexCard = ({ name, link, hasBeenSubmitted }) => {
  const classes = classNames('homework-index-card', {
    'is-submitted': hasBeenSubmitted
  });
  return (
    <div className={classes}>
      <Link to={link}>{name}</Link>
    </div>
  );
};

export default HomeworkIndexCard;
