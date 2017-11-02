import React from 'react';
import AutosizeInput from 'react-input-autosize';

const PupilCreateForm = ({ formOpen, handleChange, handleSubmit, toggleForm,  firstname, lastname, email, password, passwordConfirmation, errors }) => {
  return (
    <div className="problem-edit class-edit-wrapper">
      <div className={formOpen ? 'problem-edit-main' : 'problem-edit-main hidden'}>
        <i className="fa fa-pencil" />
        <AutosizeInput
          name="firstname"
          type="text"
          value={firstname}
          placeholder="Enter pupil's first name"
          onChange={handleChange}
        />
        {errors.firstname && <div><small className="form-error">{errors.firstname}</small></div>}
      </div>
      <div className={formOpen ? 'problem-edit-main' : 'problem-edit-main hidden'}>
        <i className="fa fa-pencil" />
        <AutosizeInput
          name="lastname"
          type="text"
          value={lastname}
          placeholder="Enter pupil's last name"
          onChange={handleChange}
        />
        {errors.lastname && <div><small className="form-error">{errors.lastname}</small></div>}
      </div>
      <div className={formOpen ? 'problem-edit-main' : 'problem-edit-main hidden'}>
        <i className="fa fa-pencil" />
        <AutosizeInput
          name="email"
          type="email"
          value={email}
          placeholder="Enter pupil's email address (it must be unique)"
          onChange={handleChange}
        />
        {errors.email && <div><small className="form-error">{errors.email}</small></div>}
      </div>
      <div className={formOpen ? 'problem-edit-main' : 'problem-edit-main hidden'}>
        <i className="fa fa-pencil" />
        <AutosizeInput
          name="password"
          type="password"
          value={password}
          placeholder="Create pupil's password"
          onChange={handleChange}
        />
        {errors.password && <div><small className="form-error">{errors.password}</small></div>}
      </div>
      <div className={formOpen ? 'problem-edit-main' : 'problem-edit-main hidden'}>
        <i className="fa fa-pencil" />
        <AutosizeInput
          name="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          placeholder="Confirm pupil's password"
          onChange={handleChange}
        />
        {errors.passwordConfirmation && <div><small className="form-error">{errors.passwordConfirmation}</small></div>}
      </div>
      <div className="modal-buttons">
        <button
          className={formOpen ? 'button is-info modal-button' : 'button is-success modal-button problem-edit-main hidden'}
          onClick={handleSubmit}
        >
          Add pupil to class
        </button>
        <button
          className={formOpen ? 'button modal-button' : 'button is-info modal-button problem-edit-main hidden'}
          onClick={toggleForm}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PupilCreateForm;
