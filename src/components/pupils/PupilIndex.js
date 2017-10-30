import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import AggregatedIndexCard from '../homeworks/AggregatedIndexCard';

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
      .then(res => this.setState({ pupils: res.data, aggregateArray: this.getAggregate(res.data)}))
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
          <h1 className="title is-1 top-space">Your Class</h1>
          <h2 className="title is-4">Pupils</h2>
        </div>
        <div className="pupil-index-list">
          <ul>
            {this.state.pupils && this.state.pupils.map(pupil =>
              <li key={pupil.id}>
                <Link to={`/pupils/${pupil.id}`}>
                  {pupil.allSubmitted ? <div className="circle green-circle"></div> : <div className="circle red-circle"></div> }
                  {`${pupil.firstname} ${pupil.lastname} - ${pupil.email}`}
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="main-title top-space">
          <h2 className="title is-4">Class Homeworks</h2>
        </div>
        <div className="homework-index">
          {this.state.aggregateArray && this.state.aggregateArray.map(hw => <AggregatedIndexCard key={hw.setDate} {...hw} />)}
        </div>
      </main>
    );
  }
}

export default PupilIndex;
