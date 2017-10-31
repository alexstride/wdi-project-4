import React from 'react';
import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import FormatDate from '../../lib/FormatDate';

const AggregatedIndexCard = ({ name, setDate, clickHandler, dueDate, haveNotSubmitted }) => {

  return (
    <div className="homework-index-card" onClick={clickHandler}>
      <div className="index-card-left">
        <h3 className="card-title" >{name}</h3>
        <p>Set: {FormatDate.getDDMMYYY(setDate)}</p>
        {dueDate && <p>Due: {FormatDate.getDDMMYYY(dueDate)}</p>}
      </div>
      <div className="index-card-right">
        <div>
          {haveNotSubmitted.length ?
            <small className="index-card-status">Unsubmitted:</small>:
            <small className="index-card-status all-submitted">All Submitted</small>
          }
        </div>
        <div><p className="unsubmitted-names">{haveNotSubmitted.join(', ')}</p></div>
      </div>
    </div>
  );
};

export default AggregatedIndexCard;
