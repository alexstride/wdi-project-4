import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class PupilIndex extends React.Component {
  state = {
    pupils: null
  }

  getAggregate(pupils) {
    const resultObject = pupils.reduce((result, pupil) => {
      pupil.homeworks.forEach(hw => {
        if (hw.setDate in result) {
          if (!hw.hasBeenSubmitted) {
            result[hw.setDate].haveNotSubmitted.push(`${pupil.firstname} ${pupil.lastname}`);
          }
        } else {
          result[hw.setDate] = {name: hw.name, setDate: hw.setDate, dueDate: hw.dueDate, haveNotSubmitted: []};
          if (!hw.hasBeenSubmitted) {
            result[hw.setDate].haveNotSubmitted.push(`${pupil.firstname} ${pupil.lastname}`);
          }
        }
      });
      return result;
    }, {});
    return Object.values(resultObject);
  }

  componentDidMount() {
    const payload = Auth.getPayload();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .get(`/api/teachers/${payload.teacherId}/pupils`, { headers })
      .then(res => this.setState({ pupils: res.data }))
      .then(() => this.setState({aggregateArray: this.getAggregate(this.state.pupils)}, () => console.log(this.state)))
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          Flash.setMessage({ message: 'Access denied', type: 'danger'});
          this.props.history.push('/teachers/login');
        } else {
          console.log(err);
        }
      });
  }

  render() {
    console.dir(this.state.pupils);
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
