import React from 'react';

import CodeBlock from './CodeBlock';

const ProblemCreateWrapper = ({description, handleChange, starterCode }) => {
  return (
    <div className="problem-wrapper">
      <input type="text" value={description} placeholder="Enter instructions for pupil" />
      <div className="code-block">
        <CodeBlock
          pupilCode={starterCode}
          handleChange={handleChange}
          isSubmitted={false}
        />
      </div>
    </div>
  );
};

export default ProblemCreateWrapper;
