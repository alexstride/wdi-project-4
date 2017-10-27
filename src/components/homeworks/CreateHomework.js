import React from 'react';

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
        }
      };
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
                className="input"
                type="text"
                value={this.state.homework.name}
                placeholder="Homework name"
              ></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateHomework;
