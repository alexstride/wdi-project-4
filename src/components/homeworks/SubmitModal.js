import React from 'react';

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
        <p className="buttons has-addons is-centered">
          <span
            onClick={handleSubmit}
            className="button is-primary"
          >
            Submit
          </span>
          <span
            onClick={toggleModal}
            className="button is-info"
          >
            Cancel
          </span>
        </p>
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
