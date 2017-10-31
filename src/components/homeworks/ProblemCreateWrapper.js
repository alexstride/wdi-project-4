import React from 'react';
import AutosizeInput from 'react-input-autosize';

import CodeBlock from './CodeBlock';

const ProblemCreateWrapper = ({description, handleChange, starterCode, questionNum, deleteProb, error}) => {
  return (
    <div className="problem-wrapper problem-edit">
      <div className="problem-edit-header">
        <p>Question {questionNum})</p>
        <a className="delete" onClick={deleteProb}/>
      </div>
      <div className="problem-edit-main">
        <i className="fa fa-pencil" />
        <AutosizeInput
          name="description"
          type="text"
          value={description}
          placeholder="Enter instructions for pupil"
          onChange={handleChange}
        />
        <div>
          {error[`homeworks.2.problems.${questionNum - 1}.description`] && <small className="form-error">{error[`homeworks.2.problems.${questionNum - 1}.description`]}</small>}
        </div>
        <div className="code-block">
          <CodeBlock
            pupilCode={starterCode}
            handleChange={(newVal) => handleChange({target: {name: 'starterCode', value: newVal}})}
            isSubmitted={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemCreateWrapper;
