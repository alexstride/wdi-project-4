import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToDashboard = () => {
  return (
    <Link className="return-to-dashboard" to="/pupils">
      <span>
        <i className="fa fa-angle-double-left" aria-hidden="true"></i>Return to dashboard
      </span>
    </Link>
  );
};

export default ReturnToDashboard;
