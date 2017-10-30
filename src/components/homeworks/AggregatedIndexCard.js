import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FormatDate from '../../lib/FormatDate';

const AggregatedIndexCard = ({ name, link, setDate, onClick, dueDate, haveNotSubmitted }) => {

  return (
    <div className="homework-index-card" onClick={onClick}>
      <div className="index-card-left">
        <Link className="card-title" to="/">{name}</Link>
        <p>Set: {FormatDate.getDDMMYYY(setDate)}</p>
        {dueDate && <p>Due: {FormatDate.getDDMMYYY(dueDate)}</p>}
      </div>
      <div className="index-card-right">
        <div>
          <small className="index-card-status">Unsubmitted:</small>
        </div>
        <div><p className="unsubmitted-names">{haveNotSubmitted.join(', ')}</p></div>
      </div>
    </div>
  );
};

export default AggregatedIndexCard;
