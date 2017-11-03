import React from 'react';
import Axios from 'axios';

import Flash from '../../lib/Flash';

class TeacherRegister extends React.Component {
  state = {
    credentials: {
    },
    errors: {}
  }

  handleChange = ({ target: { name, value }}) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    this.setState({ credentials });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/teachers', this.state.credentials)
      .then(() => {
        Flash.setMessage({
          message: 'Thanks for registering. Please now login to view the site!',
          type: 'info'
        });
        this.props.history.push('/teachers/login');
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <main className="container">
        <div className="main-title">
          <h1 className="title is-1">Create a Teacher Account</h1>
        </div>
        <div className="centered-content">
          <form className="half-width" onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">First name</label>
              <div className="control">
                <input className="input" type="text" name="firstname" onChange={this.handleChange}/>
              </div>
              {this.state.errors.firstname && <small className="form-error">{this.state.errors.firstname}</small>}
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input className="input" type="text" name="lastname" onChange={this.handleChange}/>
              </div>
              {this.state.errors.lastname && <small className="form-error">{this.state.errors.lastname}</small>}

            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" name="email" onChange={this.handleChange}/>
              </div>
              {this.state.errors.email && <small className="form-error">{this.state.errors.email}</small>}
            </div>

            <div className="field">
              <label className="label">School</label>
              <div className="control">
                <input className="input" type="text" name="school" onChange={this.handleChange}/>
              </div>
              {this.state.errors.school && <small className="form-error">{this.state.errors.school}</small>}

            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" name="password"  onChange={this.handleChange}/>
              </div>
              {this.state.errors.password && <small className="form-error">{this.state.errors.password}</small>}

            </div>

            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input className="input" type="password" name="passwordConfirmation"  onChange={this.handleChange}/>
              </div>
              {this.state.errors.passwordConfirmation && <small className="form-error">{this.state.errors.passwordConfirmation}</small>}

            </div>

            <div className="control">
              <button className="button is-info">Submit</button>
            </div>

          </form>
        </div>
      </main>
    );
  }
}

export default TeacherRegister;
