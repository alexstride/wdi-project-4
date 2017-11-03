import React from 'react';

import '../../scss/partials/_submitModal.scss';

const SetHomeworkModal = ({handleSubmit, toggleModal, modalOpen}) => {
  return (
    <div className={modalOpen ? 'modal is-active' : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-content box">
        <h3
          className="title is-3"
        >
          Are you sure you want to set this homework to your class?
        </h3>
        <div className="modal-buttons">
          <button className="modal-button button is-success" onClick={handleSubmit}>Set</button>
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

export default SetHomeworkModal;
