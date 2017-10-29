import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Nav extends React.Component {
  state ={
    isAuth: null,
    userType: null,
    navActive: false
  }

  componentDidMount() {
    let userType = null;
    const isAuth = Auth.isAuthenticated();
    if (isAuth) userType = Auth.getPayload().userType;

    this.setState({
      userType,
      isAuth
    });
  }

  logout(e) {
    e.preventDefault();
    Auth.logout();
    this.props.history.push('/');
  }

  toggleNav = () => {
    this.setState(prevState => Object.assign({}, prevState, { navActive: !prevState.navActive}));
  }

  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">HwPy</Link>

          <div className={`navbar-burger burger ${this.state.navActive ? 'is-active' : ''}`} data-target="navMenu" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navMenu" className={`navbar-menu ${this.state.navActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            {this.state.isAuth && this.state.userType === 'teacher' &&
              <div className="navbar-item">
                <Link to="/pupils">
                  All Pupils
                </Link>
              </div>
            }
            {this.state.isAuth && this.state.userType === 'teacher' &&
              <div className="navbar-item">
                <Link to="/homeworks/new">
                  Create Homework
                </Link>
              </div>
            }
            {this.state.isAuth && this.state.userType === 'pupil' &&
              <div className="navbar-item">
                <Link to={`/pupils/${Auth.getPayload().pupilId}`}>
                  All Homeworks
                </Link>
              </div>
            }

          </div>

          <div className="navbar-end">
            {this.state.isAuth && <div className="navbar-item">
              <div className="control">
                <button className="button is-danger" onClick={this.logout}>
                  Log Out
                </button>
              </div>
            </div>}
          </div>
        </div>
      </nav>
    );
  }
};


export default withRouter(Nav);
