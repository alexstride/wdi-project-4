import React from 'react';
import Flash from '../../lib/Flash';

const FlashMessage = () => {
  const messageObj = Flash.getMessage();
  return (
    <div>
      {messageObj && <div className={`notification is-${messageObj.type}`}>{messageObj.message}</div>}
    </div>
  );
};

export default FlashMessage;
