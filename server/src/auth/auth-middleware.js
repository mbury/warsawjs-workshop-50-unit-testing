var createError = require('http-errors');

function checkSignIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next(createError(401));
  }
}
exports.checkSignIn = checkSignIn;
