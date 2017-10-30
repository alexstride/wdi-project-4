import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class PupilCreate extends React.Component {

  state = {
    pupils: null,
    newPupils: [],
    pupil: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      teacher: Auth.getPayload().teacherId
    }
  };

  componentDidMount() {
    const payload = Auth.getPayload();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .get(`/api/teachers/${payload.teacherId}/pupils`, { headers })
      .then(res => this.setState({ pupils: res.data }, console.log(res)))
      .catch(err => {
        if (err.response.status === 401) {
          Flash.setMessage({ message: 'Access denied', type: 'danger'});
          this.props.history.push('/teachers/login');
        } else {
          console.log(err);
        }
      });
  }

  componentDidUpdate() {
    this.scrollToAddPupilButton();
    console.log(this.state);
  }

  handleChange = ({target: { name, value }}) => {
    const pupil = Object.assign({}, this.state.pupil, { [name]: value });
    this.setState({ pupil });
  }

  addPupil = (e) => {
    e.preventDefault();
    const pupil = {firstname: '', lastname: '', email: '', password: '', passwordConfirmation: '', teacher: Auth.getPayload().teacherId};
    const newPupils = this.state.newPupils.slice();
    newPupils.push(this.state.pupil);
    this.setState({ newPupils, pupil });
  }

  removePupil = (e, index) => {
    e.preventDefault();
    const newPupils = this.state.newPupils.filter((pupil, pupilIndex) => pupilIndex !== index);
    this.setState({ newPupils });
  }

  saveClass = (e) => {
    e.preventDefault();
    Axios
      .post('/api/pupils/multiple', this.state.newPupils)
      .then(() => this.props.history.push('/pupils'))
      .catch(err => {
        if (err.response.status === 401) {
          Flash.setMessage({ message: 'Access denied', type: 'danger'});
          this.props.history.push('/teachers/login');
        } else {
          console.log(err);
        }
      });
  }

  scrollToAddPupilButton = () => {
    this.addPupilButton.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return(
      <div className="container homework">
        <div className="homework-background"></div>
        <div className="homework-wrapper">
          <div className="main-title">
            <h1 className="title is-1">
              Use this form to add pupils to your class
            </h1>
          </div>
          <div className="problem-wrapper">
            <h5 className="title is-5">
              Your current class:
            </h5>
            <div className="pupil-index-list">
              <ul>
                {this.state.pupils && this.state.pupils.map(pupil =>
                  <li
                    key={pupil.id}
                  >{`${pupil.firstname} ${pupil.lastname} - ${pupil.email}`}</li>)}
              </ul>
            </div>
            <div className="level"></div>
            <h5 className="title is-5">
              Your new class members:
            </h5>
            <div className="pupil-index-list">
              <ul>
                {this.state.newPupils && this.state.newPupils.map((pupil, index) =>
                  <li
                    key={index}
                  >{`${pupil.firstname} ${pupil.lastname} - ${pupil.email}  `}<a className="delete" onClick={(e) => this.removePupil(e, index)}></a></li>)}
              </ul>
            </div>
            <button
              className="button is-info is-small"
              onClick={this.saveClass}
            >
              Create/update class
            </button>
          </div>

          <div className="problem-wrapper">
            <form onSubmit={this.addPupil}>
              <div className="field">
                <label className="label" htmlFor="firstname">{'Pupil\'s first name'}</label>
                <div className="controller">
                  <input
                    className="input"
                    name="firstname"
                    type="text"
                    value={this.state.pupil.firstname}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="lastname">{'Pupil\'s last name'}</label>
                <div className="controller">
                  <input
                    className="input"
                    name="lastname"
                    type="text"
                    value={this.state.pupil.lastname}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="email">{'Pupil\'s email address'}</label>
                <div className="controller">
                  <input
                    className="input"
                    name="email"
                    type="email"
                    value={this.state.pupil.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="password">{'Pupil\'s password'}</label>
                <div className="controller">
                  <input
                    className="input"
                    name="password"
                    type="password"
                    value={this.state.pupil.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="passwordConfirmation">{'Pupil\'s password confirmation'}</label>
                <div className="controller">
                  <input
                    className="input"
                    name="passwordConfirmation"
                    type="password"
                    value={this.state.pupil.passwordConfirmation}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button
                className="button is-info is-small"
                ref={(element) => this.addPupilButton = element}
              >
                Add pupil
              </button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default PupilCreate;
