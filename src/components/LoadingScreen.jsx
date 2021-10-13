import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center bg-black bg-opacity-50">
      <CircularProgress className="place-self-center" />
    </div>
  );
}
