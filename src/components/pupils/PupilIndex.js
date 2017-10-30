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
    const payload = Auth.getPayload();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .get(`/api/teachers/${payload.teacherId}/pupils`, { headers })
      .then(res => this.setState({ pupils: res.data },() => console.log(res.data)))
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
          <ul>
            {this.state.pupils && this.state.pupils.map(pupil =>
              <li key={pupil.id}>
                <Link to={`/pupils/${pupil.id}`}>
                  {pupil.allSubmitted ? <div className="green-circle"></div> : <div className="red-circle"></div> }
                  {`${pupil.firstname} ${pupil.lastname} - ${pupil.email}`}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </main>
    );
  }
}

export default PupilIndex;
