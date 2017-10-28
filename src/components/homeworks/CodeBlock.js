import React from 'react';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/twilight';

const CodeBlock = ({pupilCode, handleChange, name, isSubmitted}) => {
  return (
    <div>
      <AceEditor
        value={pupilCode}
        className="ace-component"
        mode="python"
        theme="twilight"
        onChange={handleChange}
        name={name}
        height='250px'
        width='600px'
        fontSize='18px'
        editorProps={{$blockScrolling: true}}
        readOnly={isSubmitted}
      />
    </div>
  );
};

export default CodeBlock;
