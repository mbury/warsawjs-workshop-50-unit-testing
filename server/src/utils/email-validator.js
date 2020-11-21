function isEmailAllowed(email) {
  const [login, domain] = email.split('@');
  return (
    domain === 'warsaw.js' &&
    // non-alphanumeric
    /^[a-zA-Z]+$/.test(login)
  );
}
module.exports = { isEmailAllowed };
