import React from 'react';

const Feedback = ({user, feedback, feedbackSubmit, feedbackOnChange}) => {
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
          <input className="input">Please provide feedback:</input>
          <div className="control">
            <textarea onChange={feedbackOnChange}className="textarea" value={feedback} placeholder="please provide feedback"></textarea>
          </div>
        </div>
      </form>}
    </div>
  );
};

export default Feedback;
