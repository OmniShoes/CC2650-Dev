import React, { useState, useEffect, useReducer, useRef } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import shallow from 'zustand/shallow';
import useStore from '../store';

import { saveJson, saveCsv } from '../utils/savefile';

import Layout from '../components/Layout';
import { isWebBtAvailable, getDevice, getCharacteristic } from '../utils/bluetooth';

function readingListReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        action.payload,
      ];
    case 'clear':
      return [];
    default:
      throw new Error();
  }
}

export default function Page() {
  const { bluetoothDevice } = useStore((state) => state.bt, shallow);
  const {
    deviceNamePrefix, retrievalInterval, allowMarking,
  } = useStore((state) => state.settings);
  const { setLoading, unsetLoading } = useStore((state) => state.state);
  const [timeoutID, setTimeoutID] = useState(null);
  const [readingList, readingListDispatch] = useReducer(readingListReducer, []);
  const [readingText, setReadingText] = useState('');
  // const [marked, setMarked] = useState(false);
  const markedRef = useRef(false);

  useEffect(() => {
    setReadingText(readingList.map(
      (x) => {
        const keys = Object.keys(x);
        const timestampIndex = keys.indexOf('timestamp');
        if (timestampIndex > -1) {
          keys.splice(timestampIndex, 1);
        }
        let line = `timestamp: ${new Date(x.timestamp).toJSON()}`;
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          line += `\t\t${key}: ${x[key]}`;
        }
        return line;
      },
    ).join('\n'));
  }, [readingList]);

  const startRecording = () => {
    setLoading();
    getCharacteristic(
      0x180f,
      '00002a19-0000-1000-8000-00805f9b34fb',
    ).then((characteristic) => {
      setTimeoutID(setInterval(() => {
        characteristic.readValue().then((dataView) => {
          const data = dataView.getUint8(0);
          const payload = {
            timestamp: Date.now(),
            battery_level: data,
          };
          if (allowMarking) {
            payload.marked = markedRef.current;
          }
          markedRef.current = false;
          readingListDispatch({
            type: 'add',
            payload,
          });
        });
      }, retrievalInterval));
      unsetLoading();
    });
  };

  const getContent = () => {
    if (isWebBtAvailable()) {
      if (bluetoothDevice != null) {
        return (
          <div className="flex flex-col flex-1 gap-4 pt-2 px-2">
            <Typography variant="h6" className="self-center">
              Connected Device:
              {' '}
              {bluetoothDevice.name}
            </Typography>
            <div className="flex flex-col flex-1 gap-4 items-center justify-center">
              { readingList.length > 0
                ? (
                  <>
                    { timeoutID ? (
                      <Button
                        variant="contained"
                        className="w-32"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          clearInterval(timeoutID);
                          setTimeoutID(null);
                        }}
                      >
                        Pause
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className="w-32"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          startRecording();
                        }}
                      >
                        Start
                      </Button>
                    )}
                    {
                      allowMarking && (
                        <Button
                          variant="contained"
                          className="w-64 h-64"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            markedRef.current = true;
                            setTimeout(() => {
                              markedRef.current = false;
                            }, 1000);
                          }}
                        >
                          Mark
                        </Button>
                      )
                    }
                    <TextField label="Readings" variant="outlined" multiline maxRows={8} value={readingText} className="self-stretch" />
                    <div className="flex flex-row gap-4">
                      <Button
                        variant="contained"
                        className="w-32"
                        color="secondary"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          readingListDispatch({ type: 'clear' });
                        }}
                      >
                        Clear
                      </Button>
                      <Button
                        variant="contained"
                        className="w-32"
                        color="primary"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          saveCsv(readingList);
                        }}
                      >
                        Save CSV
                      </Button>
                      <Button
                        variant="contained"
                        className="w-32"
                        color="primary"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          saveJson(readingList);
                        }}
                      >
                        Save JSON
                      </Button>
                    </div>
                  </>
                )
                : (
                  <Button
                    variant="contained"
                    className="w-32"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startRecording();
                    }}
                  >
                    Start
                  </Button>
                )}
            </div>
          </div>
        );
      }
      return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <Button
            variant="contained"
            className="w-32"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await getDevice(deviceNamePrefix);
            }}
          >
            Connect
          </Button>
        </div>
      );
    }
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p>
          Web Bluetooth is not available on your browser. Please refer to
          {' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility" className="text-blue-600">this website</a>
          {' '}
          to see which browsers support Web Bluetooth.
        </p>
      </div>
    );
  };

  return (
    <Layout index={0} className="flex flex-col">
      {
        getContent()
      }
    </Layout>
  );
}
