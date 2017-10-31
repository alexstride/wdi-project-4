import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import CodeBlock from './CodeBlock';
import Feedback from './Feedback';
import FormatDate from '../../lib/FormatDate';

class ShowHomeworkByQuestion extends React.Component {

  state = {
    pupils: null,
    questions: null,
    homework: null,
    user: Auth.getPayload()
  }

  componentDidMount() {
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

  // example URL http://localhost:8000/homeworks/1509135893000/question/1

  getQuestions(hwSetDate, qNum) {
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

  getHomework(hwSetDate, qNum) {
    const index = qNum - 1;
    const date = (new Date(parseInt(hwSetDate))).toISOString();
    const homeworkHeader = this.state.pupils.reduce((hw, pupil) => {
      pupil.homeworks.forEach(homework => {
        if(Object.entries(hw).length === 0 && homework.setDate === date) {
          hw.name = homework.name;
          hw.setDate = homework.setDate;
          hw.dueDate = homework.dueDate;
          hw.description = homework.problems[index].description;
        }
      });
      return hw;
    }, {});
    this.setState({ homework: homeworkHeader }, () => console.log('getHomework ===>', this.state));
  }

  feedbackOnChange = (e, id) => {
    const questions = this.state.questions.map(question => {
      if(question.problem.id === id) {
        const loveley =  Object.assign(question, {problem: {feedback: e.target.value, feedbackMessage: 'Your feedback has not been saved', description: question.problem.description, id: question.problem.id, pupilCode: question.problem.pupilCode, starterCode: question.problem.starterCode, _id: question.problem._id}});
        console.log(loveley);
        return loveley;
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
        },() => console.log(this.state));
      })
      // .then((res) => this.setState(prevState => {
      //   const newProblems = prevState.questions.problems.map(problem => (res.data.id === problem.id) ? Object.assign(problem, res.data, { feedbackMessage: null }) : problem);
      //   const newState = Object.assign({}, prevState);
      //   newState.homework.problems = newProblems;
      //   return newState;
      // }))
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
                <h1 className="title is-1">
                  {this.state.homework.name}
                </h1>
                <p className="subtitle is-5">Set date: {FormatDate.getDDMMYYY(this.state.homework.setDate)} - Due date: {this.state.homework.dueDate ? FormatDate.getDDMMYYY(this.state.homework.dueDate) : 'n/a'}</p>
                <p>Description: {this.state.homework.description}</p>
              </div>
            }
          </div>
          <div>
            {this.state.questions && this.state.questions.map(question => {
              return (
                <div key={question.pupilId}>
                  <p>{question.name}:</p>
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
        </div>
      </main>
    );
  }
}

export default ShowHomeworkByQuestion;
