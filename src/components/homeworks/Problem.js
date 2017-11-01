import React from 'react';

import Description from './Description';
import CodeBlockFormWrapper from './CodeBlockFormWrapper';
import Feedback from './Feedback';

//it seems that a lot of information is getting passed through into this component, and not all of it is being used. This should probably be reviewed.

const Problem = ({problem, homework, handleChange, codeBlockHandleSubmit, user, feedbackSubmit, feedbackOnChange}) => {
  return (
    <div className="problem-wrapper">
      <Description {...problem}/>
      <CodeBlockFormWrapper
        key={problem.id}
        {...problem}
        parentId={homework.id}
        isSubmitted={homework.hasBeenSubmitted}
        handleChange={(newValue) => handleChange(newValue, problem._id)}
        handleSubmit={(e) => codeBlockHandleSubmit(e, problem._id, problem.pupilCode)}
      />
      <Feedback
        {...problem}
        user={user}
        feedbackSubmit={(e) => feedbackSubmit(e, problem._id, problem.feedback)}
        feedbackOnChange={(e) => feedbackOnChange(e, problem._id, problem.feedback)}
      />
    </div>
  );
};

export default Problem;
