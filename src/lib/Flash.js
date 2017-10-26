class Flash {
  static setMessage(messageObject) {
    localStorage.setItem('message', messageObject.message);
    if (messageObject.type) localStorage.setItem('messageType', messageObject.type);
    return true;
  }

  static getMessage() {
    const message = localStorage.getItem('message');
    const type = localStorage.getItem('messageType');
    return message ? { message, type} : null;
  }
}

export default Flash;
