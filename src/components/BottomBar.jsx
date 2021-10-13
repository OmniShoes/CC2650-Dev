import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/AccountBox';

export default function BottomBar({ index }) {
  const history = useHistory();
  const [navItemIndex, setNavItemIndex] = useState(index ?? 0);

  const handleNavActionClick = (idx) => {
    setNavItemIndex(idx);
    switch (idx) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push('/user');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={navItemIndex}
      onChange={(event, newValue) => {
        handleNavActionClick(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="User" icon={<UserIcon />} />
    </BottomNavigation>
  );
}
