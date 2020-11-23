var createError = require('http-errors');
const { checkSignIn } = require('../auth/auth-middleware');

test('should pass thru user with active session', () => {
  const req = { session: { user: {} } };
  let call = 0;
  let listOfArgs = true;
  const next = (...a) => {
    call = call + 1;
    listOfArgs = a;
  };
  const res = () => {};
  checkSignIn(req, res, next);
  expect(call).toBe(1);
  expect(listOfArgs.length).toBe(0);
});

test('should pass thru user with active session v2', () => {
  const req = { session: { user: {} } };
  const next = jest.fn();
  const res = () => {};
  checkSignIn(req, res, next);
  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toBeCalledWith();
});

test('should block without active session', () => {
  const req = { session: {} };
  const next = jest.fn();
  const res = () => {};
  checkSignIn(req, res, next);
  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toBeCalledWith(createError(401));
});
