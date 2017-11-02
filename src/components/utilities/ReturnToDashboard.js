import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToDashboard = ({ destinationURL, destinationName }) => {
  return (
    <Link className="return-to-dashboard" to={destinationURL}>
      <span>
        <i className="fa fa-hand-o-left" aria-hidden="true"></i> {`Return to ${destinationName}`}
      </span>
    </Link>
  );
};

export default ReturnToDashboard;
