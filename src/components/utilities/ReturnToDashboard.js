import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToDashboard = (props) => {
  return (
    <Link className="return-to-dashboard" to={props.destinationURL}>
      <span>
        <i className="fa fa-hand-o-left" aria-hidden="true"></i> {`Return to ${props.destinationName}`}
      </span>
    </Link>
  );
};

export default ReturnToDashboard;
