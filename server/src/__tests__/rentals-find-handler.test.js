const { rentalsFindHandler } = require('../rentals/rentals-handlers');

jest.mock('knex', () => {
  return () => () => ({
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    then: jest.fn(function (done) {
      done([1, 2]);
    }),
  });
});

describe('Rental find handler', () => {
  test('valid path', async () => {
    const req = { session: { user: { user_id: 1 } } };
    const res = { json: jest.fn() };
    await rentalsFindHandler(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith([1, 2]);
  });
});
