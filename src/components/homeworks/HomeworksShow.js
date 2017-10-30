import React from 'react';
import Axios from 'axios';
import Flash from '../../lib/Flash';

import Auth from '../../lib/Auth';

import Problem from './Problem';
import SubmitModal from './SubmitModal';

import '../../scss/partials/_homeworkStyles.scss';

class HomeworksShow extends React.Component {

  state = {
    user: null,
    homework: null,
    submitModalOpen: false
  }

  componentDidMount() {
    Axios
      .get(`/api/pupils/${this.props.match.params.id}/homeworks/${this.props.match.params.homeworkId}`)
      .then(res => this.setState({ homework: res.data, user: Auth.getPayload()}))
      .catch(err => {
        if (err.response.status === 401) {
          Flash.setMessage({ message: 'Access denied', type: 'danger'});
          this.props.history.push('/teachers/login');
        } else if (err.response.status === 404) {
          this.props.history.push('/NoRoute');
        } else {
          console.log(err);
        }
      });
  }

  handleChange = (newValue, id) => {
    const problems = this.state.homework.problems.map(prob => {
      if (prob._id === id) {
        return Object.assign(prob, { pupilCode: newValue, message: 'Your work has not been saved' });
      } else {
        return prob;
      }
    });
    this.setState(prevState => {
      const newState = Object.assign({}, prevState);
      newState.homework.problems = problems;
      return newState;
    });
  }

  submitConfirm = (e) => {
    e.preventDefault();
    Axios
      .put(`/api/pupils/${this.props.match.params.id}/homeworks/${this.props.match.params.homeworkId}`, Object.assign(this.state.homework, { hasBeenSubmitted: true }))
      .then(res => {
        this.setState({ homework: res.data });
      })
      .then(() => this.setState({submitModalOpen: !this.state.submitModalOpen}))
      .catch(err => console.log(err));
  }

  saveAndReturn = (e) => {
    e.preventDefault();
    e.preventDefault();
    Axios
      .put(`/api/pupils/${this.props.match.params.id}/homeworks/${this.props.match.params.homeworkId}`, Object.assign(this.state.homework, { hasBeenSubmitted: true }))
      .then(res => {
        this.setState({ homework: res.data });
      })
      .then(() => this.props.history.push(`/pupils/${this.props.match.params.id}`))
      .catch(err => console.log(err));
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({submitModalOpen: !this.state.submitModalOpen});
  }

  createMessage(id, message) {
    const problems = this.state.homework.problems.map(problem => {
      if(problem._id === id) {
        return Object.assign(problem, {message: message});
      } else {
        return problem;
      }
    });
    this.setState(prevState => {
      const newState = Object.assign({}, prevState);
      newState.homework.problems = problems;
      return newState;
    });
  }

  codeBlockHandleSubmit = (e, id, pupilCode) => {
    e.preventDefault();
    Axios
      .put(`/api/pupils/${this.props.match.params.id}/homeworks/${this.props.match.params.homeworkId}/problems/${id}`, { pupilCode: pupilCode })
      .then(() => {
        this.createMessage(id, 'All changes saved');
      })
      .catch(() => {
        this.createMessage(id, 'Your work was unable to be saved');
      });
  }

  //change these functions so that there is a new attribute indicating whether or not there are outstanding changes.

  feedbackOnChange = (e, id) => {
    const newProblems = this.state.homework.problems.map(problem => {
      if(problem.id === id) {
        return Object.assign(problem, {feedback: e.target.value, feedbackMessage: 'Your feedback has not been saved'});
      } else {
        return problem;
      }
    });
    this.setState(prevState => {
      const newState = Object.assign({}, prevState);
      newState.homework.problems = newProblems;
      return newState;
    });
  }

  feedbackSubmit = (e, id, feedback) => {
    e.preventDefault();
    Axios
      .put(`/api/pupils/${this.props.match.params.id}/homeworks/${this.props.match.params.homeworkId}/problems/${id}`, {feedback})
      .then((res) => this.setState(prevState => {
        const newProblems = prevState.homework.problems.map(problem => (res.data.id === problem.id) ? Object.assign(problem, res.data, { feedbackMessage: null }) : problem);
        const newState = Object.assign({}, prevState);
        newState.homework.problems = newProblems;
        return newState;
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main className="container homework">
        <div className="homework-background"></div>
        <div className="homework-wrapper">
          <div className="main-title">
            {this.state.homework && <h1 className="title is-1">{this.state.homework.name}</h1>}
            {this.state.homework && this.state.homework.hasBeenSubmitted && <p className="subtitle is-5">This homework has been submitted</p>}
          </div>

          {this.state.homework && this.state.homework.problems.map(problem =>
            <Problem
              user={this.state.user}
              key={problem.id}
              problem={problem}
              homework={this.state.homework}
              handleChange={this.handleChange}
              codeBlockHandleSubmit={this.codeBlockHandleSubmit}
              feedbackSubmit={this.feedbackSubmit}
              feedbackOnChange={this.feedbackOnChange}
            />
          )}
          <div className="level">
            <div className="level-item">
              {this.state.homework && this.state.homework.hasBeenSubmitted ?
                <button className="button disabled pad-button" >Submitted</button> :
                <button className="button is-success submit-button with20margin" onClick={this.toggleModal}>Submit</button>
              }
            </div>
            <div className="level-item">
              {this.state.homework && this.state.homework.hasBeenSubmitted && this.state.user.teacherId &&
                <button className="button with20margin is-success" onClick={this.saveAndReturn}>Save and return</button>
              }
            </div>
          </div>
        </div>
        <SubmitModal
          handleSubmit={this.submitConfirm}
          toggleModal={this.toggleModal}
          modalOpen={this.state.submitModalOpen}
        />
      </main>
    );
  }
}

export default HomeworksShow;
