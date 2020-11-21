import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth';
import UserProfileName from './user-profile-name';

export default function NavBar(props) {
  const { isAuthenticated, user } = useAuth();
  return (
    <ul className="list-horizontal">
      <li>
        <Link to="/">strona główna</Link>
      </li>
      {isAuthenticated && (
        <React.Fragment>
          <li>
            <Link to="/rentals">historia wypożyczeń</Link>
          </li>
          <li>
            <UserProfileName user={user}></UserProfileName>
          </li>
          <li>
            <Link to="/logout">wyloguj</Link>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
}
