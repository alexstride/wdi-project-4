import React from 'react';
import Axios from 'axios';

class CodeBlock extends React.Component {
  state = {
    pupilCode: this.props.pupilCode,
    error: null
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ pupilCode: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/homeworks/${this.props.parentId}/problems/${this.props.id}`, { pupilCode: this.state.pupilCode })
      .then(() => this.setState({ error: null }))
      .catch(() => this.setState({ error: 'Error occured; unable to save work'}));
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
            readOnly={this.props.readOnly}
          >
          </textarea>
          <button className="button is-small is-info">
            Save
          </button>
          {this.state.error && <small className="form-error">{this.state.error}</small>}
        </form>
      </div>
    );
  }

}

export default CodeBlock;
