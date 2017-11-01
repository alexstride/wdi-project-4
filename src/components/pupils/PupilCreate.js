import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import ReturnToDashboard from '../utilities/ReturnToDashboard';
import { Link } from 'react-router-dom';
import DeletePupilModal from './DeletePupilModal';
import PupilCreateForm from './PupilCreateForm';

class PupilCreate extends React.Component {

  state = {
    pupils: null,
    pupil: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      teacher: Auth.getPayload().teacherId
    },
    modalOpen: false,
    formOpen: false,
    errors: {}
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
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    const cleanPupil = {firstname: '', lastname: '', email: '', password: '', passwordConfirmation: '', teacher: Auth.getPayload().teacherId};
    Axios
      .post('/api/pupils/multiple', this.state.pupil, { headers })
      .then(res => {
        const pupils = this.state.pupils.slice();
        pupils.push(res.data);
        this.setState({ pupils, pupil: cleanPupil, formOpen: false });
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  deletePupil =(e, pupilId) => {
    e.preventDefault();
    const headers = Auth.isAuthenticated() ? { authorization: `Bearer ${Auth.getToken()}`} : {};
    Axios
      .delete(`/api/pupils/${pupilId}`, { headers })
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

  toggleForm = (e) => {
    e.preventDefault();
    this.setState({ formOpen: !this.state.formOpen });
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
            <button
              className="button is-success submit-button with20margin"
              onClick={(e) => this.toggleForm(e)}
            >
              Add pupil
            </button>
          </div>
        </div>
        <PupilCreateForm
          {...this.state.pupil}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.addPupil}
          formOpen={this.state.formOpen}
          toggleForm={this.toggleForm}
        />
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
