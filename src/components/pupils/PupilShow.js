import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

import HomeworkIndexCard from '../homeworks/HomeworkIndexCard';

class PupilShow extends React.Component {
  state = {
    pupil: null
  }

  componentDidMount() {
    Axios
      .get(`/api/pupils/${this.props.match.params.id}`)
      .then(res => this.setState({ pupil: res.data }))
      .then(() => {
        // const submittedHomeworks = this.state.pupil.homeworks
        //   .filter(hw => hw.hasBeenSubmitted)
        //   .sort(FormatDate.sortDesc);
        const submittedHomeworks = _.orderBy(this.state.pupil.homeworks
          .filter(hw => hw.hasBeenSubmitted), (hw) => Date.parse(hw.setDate), 'desc');

        // const unsubmittedHomeworks = this.state.pupil.homeworks
        //   .filter(hw => !hw.hasBeenSubmitted)
        //   .sort(FormatDate.sortDesc);

        const unsubmittedHomeworks = _.orderBy(this.state.pupil.homeworks
          .filter(hw => !hw.hasBeenSubmitted), (hw) => Date.parse(hw.setDate), 'desc');


        this.setState({ submittedHomeworks, unsubmittedHomeworks });
      })
      .catch(err => console.log(err));
  }

  goToHomework = (id) => {
    this.props.history.push(`/pupils/${this.state.pupil.id}/homeworks/${id}`);
  }

  render() {
    return (
      <main className="container">
        <div className="main-title">
          {this.state.pupil && <h1 className="title is-1">Homeworks for {this.state.pupil.firstname}</h1>}
        </div>
        <div className="homework-index">
          {this.state.unsubmittedHomeworks && this.state.unsubmittedHomeworks.map(hw =>
            <HomeworkIndexCard
              key={hw.id}
              {...hw}
              link={`/pupils/${this.state.pupil.id}/homeworks/${hw.id}`}
              onClick={() => this.goToHomework(hw.id)}
            />)}
          {this.state.submittedHomeworks && this.state.submittedHomeworks.map(hw =>
            <HomeworkIndexCard
              key={hw.id}
              {...hw}
              link={`/pupils/${this.state.pupil.id}/homeworks/${hw.id}`}
              onClick={() => this.goToHomework(hw.id)}
            />)}
        </div>
      </main>

    );
  }
}

export default PupilShow;
