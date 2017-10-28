import React from 'react';
import Axios from 'axios';

import CodeBlock from './CodeBlock';

class CreateHomework extends React.Component {
  constructor() {
    super();
    this.state =
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
    Axios
      .post('/api/homeworks', newHomework)
      .then(res => console.log(res.data))
      .then(() => this.props.history.push('/pupils/'))
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

  submitProblem = (e) => {
    e.preventDefault();
    const cleanProblem = {feedback: '', starterCode: '', pupilCode: '', description: ''};
    const oldHomework = Object.assign({}, this.state.homework);
    const createdProblem = Object.assign({}, this.state.problem);
    oldHomework.problems.push(createdProblem);
    this.setState({homework: oldHomework, problem: cleanProblem});
  }

  render() {
    return (
      <div className="section container">
        <h1 className="title is-1">Use this form to create a homework</h1>
        <p className="subtitle is-3">It will be distributed to all pupils when it is submitted</p>
        <form onSubmit={this.createHomework}>
          <div className="field">
            <label className="label">Homework name:</label>
            <div className="control">
              <input
                onChange={this.handleChangeHomework}
                className="input"
                name="name"
                type="text"
                value={this.state.homework.name}
                placeholder="Homework name"
              ></input>
            </div>
          </div>
          <ul>
            {this.state.homework.problems.map((problem, i) => {
              return (
                <li key={i}>
                  <p>{problem.description}</p>
                  <CodeBlock
                    {...problem}
                    isSubmitted={true}
                  />
                </li>
              );
            })}
          </ul>

          <button className="button is-primary is-small">Submit</button>
        </form>
        <div className="section">
          <form onSubmit={this.submitProblem}>
            <div className="field">
              <label className="label">Problem:</label>
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
                <CodeBlock
                  {...this.state.problem}
                  isSubmitted={this.state.homework.hasBeenSubmitted}
                  handleChange={(newValue) => this.handleCodeBlockChange(newValue)}
                />
              </div>
            </div>
            <button className="button is-primary">Add problem</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateHomework;
