const { isEmailAllowed } = require('../utils/email-validator');

describe('Email validator ', () => {
  test('should allow warsaw.js domain', () => {
    // Arrange
    const validDomain = 'test@warsaw.js';
    // Act
    const result = isEmailAllowed(validDomain);
    // Assert
    expect(result).toBe(true);
  });

  test('should block out email without warsaw.js domain', () => {
    // Arrange
    const invalidDomain = 'test@cracow.js';
    // Act
    const result = isEmailAllowed(invalidDomain);
    // Assert
    expect(result).toBe(false);
  });

  test('should only contain alphanumeric', () => {
    expect(isEmailAllowed('test@warsaw.js')).toBe(true);

    expect(isEmailAllowed('!test@warsaw.js')).toBe(false);
    expect(isEmailAllowed('@test@warsaw.js')).toBe(false);
    expect(isEmailAllowed('_test@warsaw.js')).toBe(false);
  });

  test.each([
    '!test@warsaw.js',
    '@test@warsaw.js',
    'te.st@warsaw.js',
    'te#$%st@warsaw.js',
  ])('should block out %s', (email) => {
    expect(isEmailAllowed(email)).toBe(false);
  });
});
