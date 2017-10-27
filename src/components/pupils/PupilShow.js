import React from 'react';
import Axios from 'axios';

import HomeworkIndexCard from '../homeworks/HomeworkIndexCard';

class PupilShow extends React.Component {
  state = {
    pupil: null
  }

  componentDidMount() {
    Axios
      .get(`/api/pupils/${this.props.match.params.id}`)
      .then(res => this.setState({ pupil: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main className="container">
        <div className="main-title">
          {this.state.pupil && <h1 className="title is-1">Homeworks for {this.state.pupil.firstname}</h1>}
        </div>
        <div className="homework-index">
          {this.state.pupil && this.state.pupil.homeworks.map(hw =>
            <HomeworkIndexCard
              key={hw.id}
              {...hw}
              link={`/pupils/${this.state.pupil.id}/homeworks/${hw.id}`}
            />)}
        </div>
      </main>

    );
  }
}

export default PupilShow;
