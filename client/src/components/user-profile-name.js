import * as React from 'react';

export default function UserProfileName(props) {
  const [counter, setCounter] = React.useState(0);
  const regularIcons = ['🛴', '🚜'];
  const vipIcons = ['🚀', '🛸'];
  const index = counter % 2;
  const icon = props.user.isVip ? vipIcons[index] : regularIcons[index];
  return (
    <span>
      <span data-testid="profile-icon" onClick={() => setCounter(i => i + 1)}>
        {icon}
      </span>
      {props.user.name}
    </span>
  );
}
