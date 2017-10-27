import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class TeacherLogin extends React.Component {
  state = {
    credentials: {
      email: '',
      password: ''
    },

    error: null
  }

  handleChange = ({ target: { name, value }}) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    this.setState({ credentials });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/teachers/login', this.state.credentials)
      .then((res) => {
        return Auth.setToken(res.data.token);
      })
      .then(() => this.props.history.push('/pupils'))
      .catch(() => this.setState({ error: 'Invalid credentials' }));
  }


  render() {
    return (
      <main className="container">
        <div className="main-title">
          <h1 className="title is-1">Teacher Login</h1>
        </div>
        <div className="centered-content">
          <form className="half-width" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" name="email" onChange={this.handleChange}/>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" name="password"  onChange={this.handleChange}/>
              </div>
            </div>
            <div className="control">
              <button className="button is-primary">Submit</button>
            </div>

            {this.state.error && (<div className="form-error">
              <small>{this.state.error}</small>
            </div>)}

          </form>
        </div>
      </main>
    );
  }
}

export default TeacherLogin;
