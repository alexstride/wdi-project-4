function globalToJSON(schema) {
  schema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform(obj, json) {
      delete json.passwordConfirmation;
      delete json.__v;
      delete json.password;
    }
  });
}

module.exports = globalToJSON;
