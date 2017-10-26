import React from 'react';

import CodeBlock from '../CodeBlock';
import Feedback from './Feedback';

const Problem = ({problem, homework, handleChange, codeBlockHandleSubmit, user, feedbackSubmit, feedbackOnChange}) => {
  return (
    <div>
      <CodeBlock
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
        feedbackOnChange={() => feedbackOnChange(problem._id, problem.feedback)}
      />
    </div>
  );
};

export default Problem;
