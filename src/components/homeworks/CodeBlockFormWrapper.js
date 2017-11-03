import React from 'react';

import CodeBlock from './CodeBlock';

const CodeBlockFormWrapper = ({handleSubmit, handleChange, isSubmitted, pupilCode, starterCode, id, message, resetBlock}) => {
  return (
    <div className="code-block">
      <form onSubmit={handleSubmit}>
        <CodeBlock
          pupilCode={pupilCode}
          handleChange={handleChange}
          name={id}
          isSubmitted={isSubmitted}
        />
        <div className="code-block-footer">
          <p>{message}</p>
          <button className={message ? '' : 'deactivated'}>
            Save
          </button>
          <button onClick={resetBlock} className={pupilCode.length === starterCode.length ? 'deactivated' : 'reset'}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default CodeBlockFormWrapper;
