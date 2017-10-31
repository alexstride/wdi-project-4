import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      navActive: false
    };
  }

  componentDidMount() {
    this.props.history.listen(() => this.setState({navActive: false}));
  }

  logout = (e) => {
    e.preventDefault();
    Auth.logout();
    this.props.history.listen(() => this.setState({navActive: false}));
    this.props.history.push('/');
  }

  toggleNav = () => {
    this.setState(prevState => Object.assign({}, prevState, { navActive: !prevState.navActive}));
  }

  render() {
    let userType = null;
    const isAuth = Auth.isAuthenticated();
    if (isAuth) userType = Auth.getPayload().userType;
    console.log('nav props: ', this.props);
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
            {isAuth && userType === 'teacher' &&
              <div className="navbar-item">
                <Link to="/pupils">
                  All Pupils
                </Link>
              </div>
            }
            {isAuth && userType === 'teacher' &&
              <div className="navbar-item">
                <Link to="/pupils/new">
                  Edit Class
                </Link>
              </div>
            }
            {isAuth && userType === 'teacher' &&
              <div className="navbar-item">
                <Link to="/homeworks/new">
                  Create Homework
                </Link>
              </div>
            }
            {isAuth && userType === 'pupil' &&
              <div className="navbar-item">
                <Link to={`/pupils/${Auth.getPayload().pupilId}`}>
                  All Homeworks
                </Link>
              </div>
            }

          </div>

          <div className="navbar-end">
            {isAuth && <div className="navbar-item">
              <div className="control">
                <button className="button is-danger is-outlined" onClick={this.logout}>
                  Log Out
                </button>
              </div>
            </div>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
