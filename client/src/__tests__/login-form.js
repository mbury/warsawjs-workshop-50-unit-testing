import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';

import LoginForm from '../components/login-form';
import { useAuth as useAuthMock } from '../components/auth';
import { Redirect as RedirectMock } from 'react-router-dom';

const buildFakeUser = build('User', {
  fields: {
    name: fake(f => f.name.findName()),
    isVip: false,
  },
});

jest.mock('../components/auth', () => {
  return {
    useAuth: jest.fn(),
  };
});

jest.mock('react-router', () => ({
  Redirect: jest.fn(),
}));

afterEach(() => {
  useAuthMock.mockClear();
  RedirectMock.mockClear();
});

describe('Login form', () => {
  test('should renders successfully and submit form', () => {
    const login = jest.fn();
    useAuthMock.mockReturnValueOnce({
      login,
      isAuthenticated: false,
      error: false,
    });

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/hasło/i);
    const submitButton = screen.getByText(/zaloguj/i);

    emailInput.value = 'test@example.com';
    passInput.value = '12345';

    fireEvent.click(submitButton);

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenLastCalledWith({
      email: 'test@example.com',
      password: '12345',
    });
  });

  test('should renders successfully and submit form v2', () => {
    const login = jest.fn();
    useAuthMock.mockReturnValueOnce({
      login,
      isAuthenticated: false,
      error: false,
    });

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/hasło/i);
    const submitButton = screen.getByRole('button', { name: /zaloguj/i });

    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passInput, '12345');
    fireEvent.click(submitButton);

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenLastCalledWith({
      email: 'test@example.com',
      password: '12345',
    });
  });

  test('should redirect if user is login', () => {
    RedirectMock.mockReturnValue(<div>redirect</div>);
    useAuthMock.mockReturnValueOnce({
      login: () => {},
      isAuthenticated: true,
      error: false,
    });

    render(<LoginForm />);

    screen.getByText(/redirect/i);
    expect(RedirectMock).toBeCalledTimes(1);
    expect(RedirectMock).toHaveBeenCalledWith({ to: '/' }, {});
  });

  test('should show error if auth fails', () => {
    useAuthMock.mockReturnValueOnce({
      login: () => {},
      isAuthenticated: false,
      error: true,
    });

    render(<LoginForm />);

    expect(
      screen.getByText(/nieprawidłowy login lub hasło/i)
    ).toBeInTheDocument();
  });
});
