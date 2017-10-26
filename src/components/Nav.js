import React from 'react';
import Auth from '../lib/Auth';


const Nav = () => {
  return(
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">

        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {Auth.isAuthenticated() && <p>You are logged in as a {Auth.getPayload().userType}</p>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
