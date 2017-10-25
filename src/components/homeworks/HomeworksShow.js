import React from 'react';
import Axios from 'axios';

import CodeBlock from '../CodeBlock';

class HomeworksShow extends React.Component {

  state = {
    homework: null
  }

  componentDidMount() {
    Axios
      .get(`/api/homeworks/${this.props.match.params.id}`)
      .then(res => this.setState({ homework: res.data }));
  }

  // editProblem = (problemId) => {
  //   Axios
  //     .put(`/api/homeworks/${this.props.match.params.id}/problems/${problemId}`)
  // }

  render() {
    return (
      <main className="container">
        <div className="homework-wrapper">
          <div className="main-title">
            {this.state.homework && <h1 className="title is-1">{this.state.homework.name}</h1>}
          </div>

          {this.state.homework && this.state.homework.problems.map(problem => <CodeBlock key={problem.id} {...problem} parentId={this.state.homework.id}/>)}
          <div className="leve">
            <div className="level-item">
              <button className="button is-primary">Submit</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default HomeworksShow;
