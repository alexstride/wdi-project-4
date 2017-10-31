import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import ReturnToDashboard from '../utilities/ReturnToDashboard';
import { Link } from 'react-router-dom';
import DeletePupilModal from './DeletePupilModal';

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
    },
    modalOpen: false
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

  deletePupil =(e, pupilId) => {
    e.preventDefault();
    Axios
      .delete(`/api/pupils/${pupilId}`)
      .then(() => {
        let pupils = this.state.pupils.slice();
        pupils = pupils.filter(pupil => pupil.id !== pupilId);
        this.setState({ pupils, modalOpen: false, modalPupil: null });
      })
      .catch(err => console.log(err));

  }

  scrollToAddPupilButton = () => {
    this.addPupilButton.scrollIntoView({ behavior: 'smooth' });
  }

  toggleModal = (e, pupilId) => {
    e.preventDefault();
    if(this.state.modalOpen) {
      this.setState({modalPupil: null});
    } else {
      this.setState({modalPupil: pupilId});
    }
    this.setState({modalOpen: !this.state.modalOpen});
  }

  render() {
    return(
      <div className="container homework">
        <div className="columns title-wrapper">
          <div className="column is-4"><ReturnToDashboard /></div>
          <div className="column is-4 main-title">
            <h1 className="title is-1">
              Edit Class
            </h1>
          </div>
          <div className="column is-4"></div>
        </div>
        <div>
          <div className="main-title">
            <h4 className="title is-4">
              Pupils
            </h4>
          </div>
          <div className="pupil-index-list">
            <ul>
              {this.state.pupils && this.state.pupils.map(pupil =>
                <li key={pupil.id}>
                  <Link to={`/pupils/${pupil.id}`}>{`${pupil.firstname} ${pupil.lastname} - ${pupil.email} `}</Link>
                  <a className="delete" onClick={(e) => this.toggleModal(e, pupil.id)}/>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <button className="button is-success submit-button with20margin" >Add pupil</button>
          </div>
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
        <DeletePupilModal
          pupil={this.state.modalPupil}
          handleSubmit={this.deletePupil}
          toggleModal={this.toggleModal}
          modalOpen={this.state.modalOpen}
        />
      </div>
    );
  }
}

export default PupilCreate;
