import React from 'react';

import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function TopBar({ title, back }) {
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        {back && (
        <IconButton
          edge="start"
          aria-label="back"
          onClick={() => {
            if (typeof back === 'string' || back instanceof String) {
              history.push(back);
            } else {
              history.goBack();
            }
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        )}
        <Typography variant="h6" className="cursor-pointer" onClick={() => history.push('/')}>
          {title ?? 'CC2650-Dev'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
