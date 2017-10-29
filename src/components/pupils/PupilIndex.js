import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class PupilIndex extends React.Component {
  state = {
    pupils: null
  }

  componentDidMount() {
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .get('/api/pupils', { headers })
      .then(res => this.setState({ pupils: res.data }))
      .catch(err => {
        if (err.response.status === 401) {
          Flash.setMessage({ message: 'Access denied', type: 'danger'});
          this.props.history.push('/teachers/login');
        } else {
          console.log(err);
        }
      });
  }

  render() {
    return (
      <main className="container">
        <div className="main-title">
          <h1 className="title is-1">All Pupils</h1>
        </div>
        <div className="pupil-index-list">
          {this.state.pupils && this.state.pupils.map(pupil =>
            <Link
              key={pupil.id}
              to={`/pupils/${pupil.id}`}
            >{`${pupil.firstname} ${pupil.lastname} - ${pupil.email}`}</Link>)}
        </div>
      </main>
    );
  }
}

export default PupilIndex;
