import React from 'react';
import Axios from 'axios';

class CodeBlock extends React.Component {
  state = {
    pupilCode: this.props.pupilCode
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ pupilCode: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/homeworks/${this.props.parentId}/problems/${this.props.id}`, { pupilCode: this.props.pupilCode }); ///Left off here!
  }

  render() {
    return (
      <div className="code-block">
        <p>{this.props.description}</p>
        <form onSubmit={this.handleSubmit}>
          <textarea
            className="textarea"
            value={this.state.pupilCode}
            onChange={this.handleChange}
          >
          </textarea>
          <button className="button is-small is-info">
            Save
          </button>
        </form>
      </div>
    );
  }

}

export default CodeBlock;
