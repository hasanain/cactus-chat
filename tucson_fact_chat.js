function someOtherName(str, history) {
  history.log = history.log || [];
  history.log.push(str);
  return "Hello there!";
}

module.exports.respondTo = someOtherName;
