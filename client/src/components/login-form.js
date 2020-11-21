import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './auth';

export default function LoginForm() {
  const { login, isAuthenticated, error } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    login({ email: email.value, password: password.value });
  }

  return (
    <div>
      <h2>Wprowadź dane:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          defaultValue="jankowalski@warsaw.js"
          name="email"
          id="email"
        ></input>

        <label htmlFor="password">Hasło</label>
        <input name="password" id="password"></input>
        <button type="submit">zaloguj</button>
        {error && <div>Nieprawidłowy login lub hasło</div>}
      </form>
    </div>
  );
}
