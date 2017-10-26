import React from 'react';
import Axios from 'axios';

import CodeBlock from '../CodeBlock';

class HomeworksShow extends React.Component {

  state = {
    homework: null
  }

  componentDidMount() {
    Axios
      .get('/api/homeworks/')
      .then(res => this.setState({ homework: res.data[0] }));
  }

  handleSubmit = () => {
    Axios
      .put(`/api/homeworks/${this.state.homework._id}`, {hasBeenSubmitted: true})
      .then(res => this.setState({homework: res.data}))
      .catch(err => console.log(err));
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
              readOnly={this.state.hasBeenSubmitted}
            />)}
          <div className="level">
            <div className="level-item">
              <button
                className={this.state.homework &&
                  (this.state.homework.hasBeenSubmitted ? 'button is-light' : 'button is-primary')}
                onClick={this.handleSubmit}
              >{this.state.homework && (this.state.homework.hasBeenSubmitted ? 'Submitted' : 'Submit')}</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default HomeworksShow;
