import React from 'react';
import Axios from 'axios';

// import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/twilight';



class CodeBlock extends React.Component {
  state = {
    pupilCode: this.props.pupilCode,
    error: null
  }

  handleChange = (newValue) => {
    this.setState({ pupilCode: newValue });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/homeworks/${this.props.parentId}/problems/${this.props.id}`, { pupilCode: this.state.pupilCode })
      .then(() => this.setState({ error: null }))
      .catch(() => this.setState({ error: 'Error occured. Unable to save work'}));
  }

  render() {
    return (
      <div className="code-block">
        <p className="problem-description">{this.props.description}</p>
        <form onSubmit={this.handleSubmit}>
          <AceEditor
            value={this.state.pupilCode}
            className="ace-component"
            mode="python"
            theme="twilight"
            onChange={this.handleChange}
            name={this.props.id}
            height='250px'
            width='500px'
            fontSize='18px'
            editorProps={{$blockScrolling: true}}
            readOnly={this.props.isSubmitted}
          / >
          <button className="is-info">
            Save
          </button>
          {this.state.error && <small className="form-error">{this.state.error}</small>}
        </form>
      </div>
    );
  }

}

export default CodeBlock;
