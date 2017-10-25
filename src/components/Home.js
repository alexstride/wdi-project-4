import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Homework App!</h1>
        <p>Welcome back, one-and-only teacher!</p>
        <Link to="/pupils/login">Pupil Login</Link>
      </div>
    );
  }
}

export default Home;
