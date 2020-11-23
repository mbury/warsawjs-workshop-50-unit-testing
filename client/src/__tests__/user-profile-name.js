import { render, screen, fireEvent } from '@testing-library/react';
import { build, fake } from '@jackfranklin/test-data-bot';

import UserProfileName from '../components/user-profile-name';

const buildFakeUser = build('User', {
  fields: {
    name: fake(f => f.name.findName()),
    isVip: false,
  },
});

test('renders regular user profile name', () => {
  const regularUser = buildFakeUser();

  render(<UserProfileName user={regularUser} />);

  const nameElement = screen.getByText(regularUser.name);
  const iconElement = screen.getByTestId('profile-icon');

  expect(nameElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveTextContent('🛴');

  fireEvent.click(iconElement);

  expect(iconElement).toHaveTextContent('🚜');

  fireEvent.click(iconElement);

  expect(iconElement).toHaveTextContent('🛴');
});

test('renders vip user profile name', () => {
  const vipUser = buildFakeUser({ overrides: { isVip: true } });
  render(<UserProfileName user={vipUser} />);

  const nameElement = screen.getByText(vipUser.name);
  const iconElement = screen.getByTestId('profile-icon');

  expect(nameElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveTextContent('🚀');

  fireEvent.click(iconElement);

  expect(iconElement).toHaveTextContent('🛸');

  fireEvent.click(iconElement);

  expect(iconElement).toHaveTextContent('🚀');
});
