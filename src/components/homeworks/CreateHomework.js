import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import AutosizeInput from 'react-input-autosize';


import CodeBlock from './CodeBlock';

import '../../scss/partials/_createHomeworkStyles.scss';

class CreateHomework extends React.Component {

  state =
    {
      homework: {
        name: '',
        hasBeenSubmitted: false,
        problems: [],
        setDate: null
      },
      problem: {
        feedback: '',
        starterCode: '',
        pupilCode: '',
        description: ''
      },
      errors: null
    };

  componentDidUpdate() {
    this.scrollToCreateProblem();
  }

  handleChangeHomework = ({ target: { name, value }}) => {
    const oldHomework = Object.assign({}, this.state.homework);
    oldHomework[name] = value;
    this.setState({ homework: oldHomework });
  }

  createHomework = (e) => {
    e.preventDefault();
    const newHomework = this.state.homework;
    newHomework.setDate = new Date();
    newHomework.teacherId = Auth.getPayload().teacherId;
    Axios
      .post('/api/homeworks', newHomework)
      .then(res => console.log(res.data))
      .then(() => this.props.history.push('/pupils'))
      .catch(err => console.log(err));
  };

  handleChangeProblem = ({ target: { name, value }}) => {
    const problem = Object.assign({}, this.state.problem, { [name]: value });
    this.setState({ problem });
  }

  handleCodeBlockChange = (codeValue) => {
    const problem = Object.assign(this.state.problem, {starterCode: codeValue, pupilCode: codeValue});
    this.setState(prevState => {
      const newState = Object.assign({} , prevState);
      newState.problem = problem;
      return newState;
    });
  }

  deleteProblem(e, index) {
    e.preventDefault();
    const currentHomework = Object.assign({}, this.state.homework);
    const updatedProblems = currentHomework.problems.filter((problem, problemIndex) => problemIndex !== index);
    currentHomework.problems = updatedProblems;
    this.setState({ homework: currentHomework });
  }

  submitProblem = (e) => {
    e.preventDefault();
    const cleanProblem = {feedback: '', starterCode: '', pupilCode: '', description: ''};
    const oldHomework = Object.assign({}, this.state.homework);
    const createdProblem = Object.assign({}, this.state.problem);
    oldHomework.problems.push(createdProblem);
    this.setState({homework: oldHomework, problem: cleanProblem});
  }

  scrollToCreateProblem = () => {
    this.createProblem.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div className="container homework">
        <div className="homework-background"></div>
        <div className="homework-wrapper">

          <div className="main-title top-space">
            <div className="title-input">
              <div className='input-wrapper'>
                <AutosizeInput
                  className="title is-1"
                  name="name"
                  value={this.state.homework.name}
                  placeholder="Homework name"
                  onChange={this.handleChangeHomework}
                  autoFocus
                  autoComplete="off"
                / >
                <i className="fa fa-pencil" />
              </div>
            </div>

            <form onSubmit={this.createHomework}>
              <ul>
                {this.state.homework && this.state.homework.problems.map((problem, i) => {
                  return (
                    <li key={i}>
                      <p>{problem.description}</p>
                      <div className="code-block">
                        <div className="code-block-header">
                          <div>
                            <a className="delete" onClick={(e) => this.deleteProblem(e, i)}></a>
                          </div>
                        </div>
                        <div className="code-block">
                          <CodeBlock
                            {...problem}
                            isSubmitted={true}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </form>
          </div>
          <div className="problem-wrapper">
            <form onSubmit={this.submitProblem}>
              <div className="field">
                <label className="label">New problem:</label>
                <div className="controller">
                  <input
                    className="input"
                    type="text"
                    name="description"
                    onChange={this.handleChangeProblem}
                    value={this.state.problem.description}
                    placeholder="please provide a description for your problem"
                  ></input>
                </div>
              </div>
              <div className="field">
                <div className="controller">
                  <div className="code-block">
                    <CodeBlock
                      {...this.state.problem}
                      isSubmitted={this.state.homework.hasBeenSubmitted}
                      handleChange={(newValue) => this.handleCodeBlockChange(newValue)}
                    />
                  </div>
                </div>
              </div>
              <button
                className="button is-primary is-small"
                ref={(element) => this.createProblem = element}
              >
                Add problem
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateHomework;
