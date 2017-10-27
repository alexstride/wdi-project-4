import React from 'react';

const Feedback = ({user, feedback, feedbackSubmit, feedbackOnChange, feedbackMessage}) => {
  return (
    <div>
      {'pupilId' in user && feedback.length > 0 &&
      <div>
        <h5 className="title is-5">Your feedback:</h5>
        <p>{feedback}</p>
      </div>}
      {'teacherId' in user &&
      <form onSubmit={feedbackSubmit}>
        <div className="field">
          <label className="label">Please provide feedback:</label>
          <div className="control">
            <textarea
              onChange={feedbackOnChange}
              className="textarea"
              value={feedback}
              placeholder="please provide feedback"
            ></textarea>
          </div>
        </div>
        <button className="button is-primary">save</button>
        {feedbackMessage && <small>{feedbackMessage}</small>}
      </form>}
    </div>
  );
};

export default Feedback;
