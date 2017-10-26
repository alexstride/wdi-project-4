import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <section className="hero is-medium is-dark">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Do You Even Python?
              </h1>
              <h2 className="subtitle">
                Show me the code...
              </h2>
            </div>
          </div>
        </section>

        <section className="container has-text-centered">
          <Link to="/pupils/login" className="button is-info">Pupil Login</Link>
          <Link to="/teachers/login" className="button is-info">Teacher Login</Link>
          <Link to="/teachers/register">Create a teacher account</Link>
        </section>
      </div>
    );
  }
}

export default Home;
