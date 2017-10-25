import React from 'react';
import { Link } from 'react-router-dom';

const sectionStyles = {
  marginTop: '40px'
};

class Home extends React.Component {
  render() {
    return (
      <main>
        <section className="hero is-medium is-dark" style={sectionStyles}>
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

        <section className="container has-text-centered" style={sectionStyles}>
          <Link to="/pupils/login" className="button is-info">Pupil Login</Link>
        </section>
      </main>
    );
  }
}

export default Home;
