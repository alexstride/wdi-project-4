import React from 'react';

const Feedback = ({user, feedback, feedbackSubmit, feedbackOnChange, feedbackMessage}) => {
  return (
    <div className="feedback">
      {'pupilId' in user && feedback.length > 1 &&
      <div>
        <h5 className="label">Your feedback:</h5>
        <p className="feedback-text">{feedback}</p>
      </div>}
      {'teacherId' in user &&
      <form onSubmit={feedbackSubmit}>
        <div className="feedback-form-wrapper">
          <label className="label">Feedback:</label>
          <textarea
            onChange={feedbackOnChange}
            className="textarea"
            value={feedback}
            placeholder="Provide feedback here..."
          ></textarea>
          <div className="feedback-footer">
            <button className={feedbackMessage ? 'bla' : 'deactivated' }>Save</button>
            {feedbackMessage && <small>{feedbackMessage}</small>}
          </div>
        </div>

      </form>}
    </div>
  );
};

export default Feedback;
