import React from 'react';

import CodeBlock from './CodeBlock';

const CodeBlockFormWrapper = ({handleSubmit, pupilCode, handleChange, id, isSubmitted, message}) => {
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
        </div>
      </form>
    </div>
  );
};

export default CodeBlockFormWrapper;
