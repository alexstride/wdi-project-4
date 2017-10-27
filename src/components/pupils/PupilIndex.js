import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class PupilIndex extends React.Component {
  state = {
    pupils: null
  }

  componentDidMount() {
    Axios
      .get('/api/pupils')
      .then(res => {
        this.setState({ pupils: res.data }, () => console.log(this.state));
      })
      .catch(err => console.log(err));
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
