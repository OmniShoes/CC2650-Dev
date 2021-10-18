import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import useStore from '../store';

export default function LoadingScreen() {
  const isLoading = useStore((state) => state.state.isLoading);
  const [waitTooLong, setWaitTooLong] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);

  useEffect(() => {
    if (isLoading) {
      clearTimeout(timeoutID);
      setTimeoutID(setTimeout(() => {
        setWaitTooLong(true);
      }, 5000));
    } else {
      setWaitTooLong(false);
    }
  }, [isLoading]);

  return isLoading && (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 gap-8">
      <CircularProgress className="text-white" />
      <span className={`text-white${waitTooLong ? '' : ' hidden'}`}>Please refresh the page if this takes forever...</span>
    </div>
  );
}
