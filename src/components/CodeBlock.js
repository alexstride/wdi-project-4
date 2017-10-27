import React from 'react';

// import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/twilight';



const CodeBlock = ({handleSubmit, pupilCode, handleChange, id, isSubmitted, message}) => {
  return (
    <div className="code-block">
      <form onSubmit={handleSubmit}>
        <AceEditor
          value={pupilCode}
          className="ace-component"
          mode="python"
          theme="twilight"
          onChange={handleChange}
          name={id}
          height='250px'
          width='600px'
          fontSize='18px'
          editorProps={{$blockScrolling: true}}
          readOnly={isSubmitted}
        / >
        <div className="code-block-footer">
          <p>{message && message}</p>
          <button className="">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeBlock;
