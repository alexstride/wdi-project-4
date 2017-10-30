import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class ShowHomeworkByQuestion extends React.Component {

  state = {
    pupils: null
  }

  componentDidMount() {
    const payload = Auth.getPayload();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .get(`/api/teachers/${payload.teacherId}/pupils`, { headers })
      .then(res => this.setState({ pupils: res.data }))
      .then(() => this.getQuestions(this.props.match.params.setDate, this.props.match.params.number))
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

  getQuestions(hwSetDate, questionNumber) {
    const date = (new Date(parseInt(hwSetDate))).toISOString();
    const questions = this.state.pupils.reduce((questions, pupil) => {
      pupil.homeworks.forEach(homework => {
        if (homework.setDate === date) {
          questions.push({name: `${pupil.firstname} ${pupil.lastname}`, question: homework.problems.slice(questionNumber - 1, questionNumber)});
        }
      });
      return questions;
    }, []);
    this.setState({ questions }, () => console.log(this.state));
  }

  render() {
    return(
      <p>ShowHomeworkByQuestion</p>
    );
  }
}

export default ShowHomeworkByQuestion;
