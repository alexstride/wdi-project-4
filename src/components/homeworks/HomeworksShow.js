import React from 'react';
import Axios from 'axios';

import CodeBlock from '../CodeBlock';
import SubmitModal from './SubmitModal';

class HomeworksShow extends React.Component {

  state = {
    homework: null,
    submitModalOpen: false
  }

  componentDidMount() {
    Axios
      .get('/api/homeworks/')
      .then(res => this.setState({ homework: res.data[0] }));
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
      .put(`/api/homeworks/${this.state.homework._id}`, Object.assign(this.state.homework, { hasBeenSubmitted: true }))
      .then(res => {
        this.setState({ homework: res.data });
      })
      .then(() => this.setState({submitModalOpen: !this.state.submitModalOpen}))
      .catch(err => console.log(err));
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({submitModalOpen: !this.state.submitModalOpen});
  }

  createMessage(id, message) {
    const problems = this.state.homework.problems.map(problem => {
      if(problem._id === id) {
        const lovely = Object.assign(problem, {message: message});
        return lovely;
      } else {
        console.log(problem);
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
      .put(`/api/homeworks/${this.state.homework._id}/problems/${id}`, { pupilCode: pupilCode })
      .then(() => {
        this.createMessage(id, 'Your work has been saved');
      })
      .catch(() => {
        this.createMessage(id, 'Your work was unable to be saved');
      });
  }

  render() {
    return (
      <main className="container">
        <div className="homework-wrapper">
          <div className="main-title">
            {this.state.homework && <h1 className="title is-1">{this.state.homework.name}</h1>}
            {this.state.homework && this.state.homework.hasBeenSubmitted && <p className="subtitle is-5">This homework has been submitted</p>}
          </div>

          {this.state.homework && this.state.homework.problems.map(problem =>
            <CodeBlock
              key={problem.id}
              {...problem}
              parentId={this.state.homework.id}
              isSubmitted={this.state.homework.hasBeenSubmitted}
              handleChange={(newValue) => this.handleChange(newValue, problem._id)}
              handleSubmit={(e) => this.codeBlockHandleSubmit(e, problem._id, problem.pupilCode)}
            />)}
          <div className="level">
            <div className="level-item">
              <button
                className={this.state.homework &&
                  (this.state.homework.hasBeenSubmitted ? 'button disabled' : 'button is-success submit-button')}
                onClick={this.state.homework && (this.state.homework.hasBeenSubmitted ? '' : this.toggleModal)}
              >{this.state.homework && (this.state.homework.hasBeenSubmitted ? 'Submitted' : 'Submit')}</button>
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
