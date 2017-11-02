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
    console.log('updating');
    if(this.props.match.params.number !== this.lastNumber) {
      this.loadData();
      this.lastNumber = this.props.match.params.number;
      window.scrollTo(0, 0);
    }
    // this.props.socket.on('submitted', data => {
    //   console.log('FIRING');
    //   if (this.checkForPupilId(data.pupilId)) {
    //     this.loadData();
    //   }
    // });
  }

  componentDidMount() {
    this.loadData();
    this.lastNumber = 1;
    this.props.socket.on('submitted', data => {
      if (this.checkForPupilId(data.pupilId)) {
        this.loadData();
      }
    });
  }

  checkForPupilId = (id) => {
    if (!this.state.pupils) return false;
    return this.state.pupils.find(pupil => pupil.id === id);
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
    this.setState({ homework: homeworkHeader });
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
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .put(`/api/pupils/${pupilId}/homeworks/${homeworkId}/problems/${problemId}`, { feedback }, { headers })
      .then((res) => {
        const questions = this.state.questions.map(question => {
          if(question.problem.id === res.data.id) question.problem = res.data;
          return question;
        });

        this.setState({ questions });
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <main className="container homework">
        <div className="homework-background"></div>
        <div className="homework-wrapper">

          {this.state.homework &&
              <div className="main-title top-space">
                <h1
                  className="title is-1"
                >
                  {this.state.homework.name}
                </h1>
                <p className="subtitle is-5">Set date: {FormatDate.getDDMMYYY(this.state.homework.setDate)} - Due date: {this.state.homework.dueDate ? FormatDate.getDDMMYYY(this.state.homework.dueDate) : 'n/a'}</p>
              </div>
          }

          {this.state.homework &&

              <ul className="names-list">
                {this.state.questions.map((question, index) => {
                  return (
                    <li
                      key={index}
                      className="name"
                    >
                      <span
                        className={question.submitted ? 'greenName' : 'redName'}
                      >
                        {question.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
          }

          {this.state.homework &&
              <p className="agg-qn-description">Description: {this.state.homework.description}</p>
          }
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
                    feedbackOnChange={(e) => this.feedbackOnChange(e, question.problem.id, question.problem.feedback)}
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
