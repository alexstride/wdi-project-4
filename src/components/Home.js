import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  render() {
    return (
      <div>
        <section className="hero is-fullheight">
          <video src="assets/Workaholic.webm" autoPlay poster="assets/Workaholic.jpg" loop>
            Sorry, your browser doesnt support embedded videos,
            and watch it with your favorite video player!
          </video>
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title homepage-title">
                HomePy
              </h1>
              <h2 className="subtitle">
                Teach Python like a pro
              </h2>
              <div className="home-links">
                <div>
                  <Link to="/pupils/login" className="button is-info">Pupil Login</Link>
                  <Link to="/teachers/login" className="button is-info">Teacher Login</Link>
                </div>
                <Link to="/teachers/register" className="register-link">Create a teacher account</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
