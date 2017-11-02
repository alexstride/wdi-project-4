import React from 'react';

import '../../scss/partials/_submitModal.scss';

const DeletePupilModal = ({handleSubmit, toggleModal, modalOpen, pupil}) => {
  return (
    <div className={modalOpen ? 'modal is-active' : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-content box">
        <h3
          className="title is-3 pupil-delete-modal"
        >
          Are you sure you want to delete that pupil?
        </h3>
        <div className="modal-buttons">
          <button className="modal-button button is-danger" onClick={(e) => handleSubmit(e, pupil)}>Delete</button>
          <button className="modal-button button" onClick={toggleModal}>Cancel</button>
        </div>
      </div>
      <button
        onClick={toggleModal}
        className="modal-close is-large"
        aria-label="close"
      >
      </button>
    </div>
  );
};

export default DeletePupilModal;
