import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { useAuth } from './auth';
import LoginForm from './login-form';
import CarsTable from './cars-table';
import NavBar from './nav-bar';
import RentalsTable from './rentals-table';
import Logout from './logout';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <NavBar />
      <Switch>
        <Redirect exact from="/" to={isAuthenticated ? '/cars' : '/login'} />
        <Route path="/cars">
          <ProtectedRoutes>
            <CarsTable />
          </ProtectedRoutes>
        </Route>
        <Route path="/rentals">
          <ProtectedRoutes>
            <RentalsTable />
          </ProtectedRoutes>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </div>
  );
}

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return children;
}

export default App;
