import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import { Link } from 'react-router-dom';

class PupilCreate extends React.Component {

  state = {
    pupils: null
  };

  componentDidMount() {
    const payload = Auth.getPayload();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .get(`/api/teachers/${payload.teacherId}/pupils`, { headers })
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
    return(
      <div className="container homework">
        <div className="homework-background"></div>
        <div className="homework-wrapper">
          <div className="main-title">
            <h1 className="title is-1">
              Use this form to add pupils to your class
            </h1>
          </div>
          <div className="problem-wrapper">
            <h3 className="title is-3">
              Your current class:
            </h3>
            <div className="pupil-index-list">
              {this.state.pupils && this.state.pupils.map(pupil =>
                <Link
                  key={pupil.id}
                  to={`/pupils/${pupil.id}`}
                >{`${pupil.firstname} ${pupil.lastname} - ${pupil.email}`}</Link>)}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default PupilCreate;
