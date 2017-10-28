import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Nav = ({ history }) => {

  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  return(
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          {Auth.isAuthenticated() && Auth.getPayload().userType === 'pupil' &&
          <Link to={`/pupils/${Auth.getPayload().pupilId}`}>Your homeworks</Link>}
          {Auth.isAuthenticated() && Auth.getPayload().userType === 'teacher' &&
          <div>
            <Link to="/pupils">Your pupils</Link>
            <Link to="/homeworks/new">Create a new homework</Link>
          </div>}

        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {Auth.isAuthenticated() &&
              <div>
                <span>You are logged in as a {Auth.getPayload().userType}</span>
                <a href="#" onClick={logout} className="button is-danger">Logout</a>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};


export default withRouter(Nav);
