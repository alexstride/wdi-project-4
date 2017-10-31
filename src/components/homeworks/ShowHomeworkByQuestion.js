import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import CodeBlock from './CodeBlock';
import Feedback from './Feedback';
import FormatDate from '../../lib/FormatDate';
import { Link } from 'react-router-dom';

class ShowHomeworkByQuestion extends React.Component {

  state = {
    pupils: null,
    questions: null,
    homework: null,
    user: Auth.getPayload()
  }

  componentDidUpdate() {
    if(this.props.match.params.number !== this.lastNumber) {
      this.loadData();
      this.lastNumber = this.props.match.params.number;
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    this.loadData();
    this.lastNumber = 1;
  }

  loadData = () => {
    const payload = Auth.getPayload();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .get(`/api/teachers/${payload.teacherId}/pupils`, { headers })
      .then(res => this.setState({ pupils: res.data }))
      .then(() => this.getQuestions(this.props.match.params.setDate, this.props.match.params.number))
      .then(() => this.getHomework(this.props.match.params.setDate, this.props.match.params.number))
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

  getQuestions = (hwSetDate, qNum) => {
    const date = (new Date(parseInt(hwSetDate))).toISOString();
    const questions = this.state.pupils.reduce((problems, pupil) => {
      pupil.homeworks.forEach(homework => {
        if (homework.setDate === date) {
          const pupilQuestion = {name: `${pupil.firstname} ${pupil.lastname}`, problem: (homework.problems.slice(qNum - 1, qNum)[0]), submitted: homework.hasBeenSubmitted, pupilId: pupil._id, homeworkId: homework._id};
          problems.push(pupilQuestion);
        }
      });
      return problems;
    }, []);
    this.setState({ questions });
  }

  getHomework = (hwSetDate, qNum) => {
    const index = qNum - 1;
    const date = (new Date(parseInt(hwSetDate))).toISOString();
    const homeworkHeader = this.state.pupils.reduce((hw, pupil) => {
      pupil.homeworks.forEach(homework => {
        if(Object.entries(hw).length === 0 && homework.setDate === date) {
          hw.name = homework.name;
          hw.setDate = homework.setDate;
          hw.dueDate = homework.dueDate;
          hw.description = homework.problems[index].description;
          hw.numberOfQs = homework.problems.length;
        }
      });
      return hw;
    }, {});
    this.setState({ homework: homeworkHeader }, () => console.log(this.state));
  }

  feedbackOnChange = (e, id) => {
    const questions = this.state.questions.map(question => {
      if(question.problem.id === id) {
        return Object.assign(question, {problem: {feedback: e.target.value, feedbackMessage: 'Your feedback has not been saved', description: question.problem.description, id: question.problem.id, pupilCode: question.problem.pupilCode, starterCode: question.problem.starterCode, _id: question.problem._id}});
      } else {
        return question;
      }
    });
    this.setState(prevState => {
      const newState = Object.assign({}, prevState);
      newState.questions = questions;
      return newState;
    });
  }

  feedbackSubmit = (e, feedback, pupilId, homeworkId, problemId) => {
    e.preventDefault();
    Axios
      .put(`/api/pupils/${pupilId}/homeworks/${homeworkId}/problems/${problemId}`, {feedback})
      .then((res) => {
        this.setState(prevState => {
          const state = Object.assign({}, prevState);
          const questions = state.questions.map(question => {
            if(question.problem.id === res.data.id) {
              question.problem = res.data;
              return question;
            } else {
              return question;
            }
          });
          state.questions = questions;
          return state;
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <main className="container homework">
        <div className="homework-background"></div>
        <div className="homework-wrapper">
          <div className="main-title">
            {this.state.homework &&
              <div>
                <h1
                  className="title is-1"
                >
                  {this.state.homework.name}
                </h1>
                <p className="subtitle is-5">Set date: {FormatDate.getDDMMYYY(this.state.homework.setDate)} - Due date: {this.state.homework.dueDate ? FormatDate.getDDMMYYY(this.state.homework.dueDate) : 'n/a'}</p>
                <ul>
                  {this.state.questions.map(question => {
                    if(question.submitted) {
                      return <li key={question.id}><span  className="greenName">{question.name} </span></li>;
                    } else {
                      return <li key={question.id}><span  className="redName">{question.name} </span></li>;
                    }
                  })}</ul>
                <div className="level"></div>
                <p>Description: {this.state.homework.description}</p>
              </div>
            }
          </div>
          <div>
            {this.state.questions && this.state.questions.map(question => {
              return (
                <div key={question.pupilId}>
                  <p>{question.name} - {question.submitted ? 'Submitted' : 'Not submitted'}:</p>
                  <CodeBlock
                    pupilCode={question.problem.pupilCode}
                  />
                  <Feedback
                    {...question.problem}
                    user={this.state.user}
                    feedbackSubmit={(e) => this.feedbackSubmit(e, question.problem.feedback, question.pupilId, question.homeworkId, question.problem.id)}
                    feedbackOnChange={(e) => this.feedbackOnChange(e, question.problem._id, question.problem.feedback)}
                  />
                </div>
              );
            })}
          </div>
          {this.state.homework && (parseInt(this.props.match.params.number) !== 1) && <Link to={`/homeworks/${this.props.match.params.setDate}/question/${parseInt(this.props.match.params.number) - 1}`}>Previous Question</Link>}
          {(this.state.homework && this.state.homework.numberOfQs >= (parseInt(this.props.match.params.number) + 1)) ? <Link to={`/homeworks/${this.props.match.params.setDate}/question/${parseInt(this.props.match.params.number) + 1}`}>Next Question</Link> : <Link to="/pupils">All pupils</Link>}
        </div>
      </main>
    );
  }
}

export default ShowHomeworkByQuestion;
