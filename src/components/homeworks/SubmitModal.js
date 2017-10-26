import React from 'react';

import '../../scss/partials/_submitModal.scss';

const SubmitModal = ({handleSubmit, toggleModal, modalOpen}) => {
  return (
    <div className={modalOpen ? 'modal is-active' : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-content box">
        <h3
          className="title is-3"
        >
          Are you sure you want to submit this homework?
        </h3>
        <p>Once you have submitted you will not be able to edit your homework</p>
        <div className="modal-buttons">
          <button className="modal-button button is-info" onClick={handleSubmit}>Submit</button>
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

export default SubmitModal;
