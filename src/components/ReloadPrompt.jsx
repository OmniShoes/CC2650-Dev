/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */

import React from 'react';

import { useRegisterSW } from 'virtual:pwa-register/react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function ReloadPrompt() {
  // replaced dynamically
  //   const buildDate = '__DATE__';
  // replaced dyanmicaly
  //   const reloadSW = '__RELOAD_SW__';

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log(`SW Registered: ${r}`);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const handleClose = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={offlineReady || needRefresh}
      autoHideDuration={6000}
      onClose={handleClose}
      message={offlineReady ? 'App ready to work offline' : 'New content available, click on reload button to update'}
      action={(
        <>
          { needRefresh && (
          <Button color="secondary" size="small" onClick={() => updateServiceWorker(true)}>
            Reload
          </Button>
          )}
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
        )}
    />
  );
}
