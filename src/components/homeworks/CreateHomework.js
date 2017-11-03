import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import AutosizeInput from 'react-input-autosize';

import ProblemCreateWrapper from './ProblemCreateWrapper';
import ReturnToDashBoard from '../utilities/ReturnToDashBoard';
import SetHomeworkModal from './SetHomeworkModal';

import '../../scss/partials/_createHomeworkStyles.scss';

class CreateHomework extends React.Component {

  state =
    {
      homework: {
        name: '',
        hasBeenSubmitted: false,
        problems: [],
        setDate: new Date(),
        dueDate: (new Date()).toISOString().slice(0, 10)
      },
      newProblemVisible: false,
      errors: {},
      modalOpen: false
    };

  componentDidMount() {
    this.questions = 1;
    this.addProblemToHw();
  }

  componentDidUpdate() {
    if(this.state.homework.problems.length > this.questions) {
      this.scrollToButton();
      this.questions = 1;
    }

  }

  addProblemToHw = () => {
    this.setState(prevState => {
      const problems = prevState.homework.problems.concat({
        feedback: ' ',
        description: '',
        starterCode: '#Starter Code...',
        pupilCode: '#Starter Code...'
      });
      const resultObj = Object.assign({}, prevState);
      resultObj.homework.problems = problems;
      return resultObj;
    });

  }

  handleChangeHomework = ({ target: { name, value }}) => {
    const oldHomework = Object.assign({}, this.state.homework);
    oldHomework[name] = value;
    this.setState({ homework: oldHomework }, () => console.dir(this.state));
  }

  createHomework = (e) => {
    console.log('running function');
    e.preventDefault();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    const newHomework = this.state.homework;
    newHomework.setDate = new Date();
    newHomework.teacherId = Auth.getPayload().teacherId;
    Axios
      .post('/api/homeworks', newHomework, { headers })
      .then(() => {
        this.props.history.push('/pupils');
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  };

  handleChangeProblem = ({ target: { name, value }}, index) => {
    this.setState(prevState => {
      const newProblems = prevState.homework.problems.map((prob, i) => {
        if (i === index) {
          if( name !== 'starterCode') {
            return Object.assign(prob, {[name]: value });
          } else {
            return Object.assign(prob, {[name]: value, pupilCode: value });
          }
        } else {
          return prob;
        }
      });
      const newState = Object.assign({}, prevState);
      newState.homework.problems = newProblems;
      return newState;
    });
  }

  handleCodeBlockChange = (codeValue) => {
    const problem = Object.assign(this.state.problem, {starterCode: codeValue, pupilCode: codeValue});
    this.setState(prevState => {
      const newState = Object.assign({} , prevState);
      newState.problem = problem;
      return newState;
    });
  }

  deleteProblem(index) {
    this.questions -= 1;
    const currentHomework = Object.assign({}, this.state.homework);
    const updatedProblems = currentHomework.problems.filter((problem, problemIndex) => problemIndex !== index);
    currentHomework.problems = updatedProblems;
    this.setState({ homework: currentHomework });
  }

  scrollToButton = () => {
    this.addQButton.scrollIntoView({ behavior: 'smooth' });
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render() {
    return (
      <main className="container homework">
        <div className="homework-background"></div>
        <div className="columns main-title top-space">
          <div className="column is-3 hang-left">
            <ReturnToDashBoard
              destinationURL="/pupils"
              destinationName="Your Class"
            />
          </div>
          <div className="column is-6">
            <div className="title-input">
              <div className='title-input-wrapper'>
                <AutosizeInput
                  className="title is-1"
                  name="name"
                  value={this.state.homework.name}
                  placeholder="Homework name"
                  onChange={this.handleChangeHomework}
                  autoFocus
                  autoComplete="off"
                />
                <i className="fa fa-pencil" />
              </div>
              {this.state.errors['homeworks.2.name'] && <small className="form-error">{this.state.errors['homeworks.2.name']}</small>}
            </div>
            <div className="date-input">
              <p>Due date: </p>
              <input
                name="dueDate"
                className="input"
                type="date"
                value={this.state.homework.dueDate}
                onChange={this.handleChangeHomework}
              />
            </div>
          </div>
          <div className="column is-3"></div>
        </div>
        <div className="homework-wrapper">
          {this.state.homework && this.state.homework.problems.map((problem, i) => {
            return (
              <div key={i}>
                <ProblemCreateWrapper
                  questionNum = {i + 1}
                  error={this.state.errors}
                  {...problem}
                  handleChange={(e) => this.handleChangeProblem(e, i)}
                  deleteProb={() => this.deleteProblem(i)}
                />
              </div>
            );
          })}

          {!this.state.newProblemVisible && <a ref={element => this.addQButton = element} className="with20margin" onClick={this.addProblemToHw}>Add another question</a>}
          <button className="button is-success" onClick={this.toggleModal}>Create and Set Homework</button>
        </div>
        <SetHomeworkModal
          handleSubmit={this.createHomework}
          toggleModal={this.toggleModal}
          modalOpen={this.state.modalOpen}
        />
      </main>
    );
  }
}

export default CreateHomework;
