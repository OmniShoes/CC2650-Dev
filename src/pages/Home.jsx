import React, {
  useState, useEffect, useReducer, useRef,
} from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import shallow from 'zustand/shallow';
import useStore from '../store';

import { saveJson, saveCsv } from '../utils/savefile';

import Layout from '../components/Layout';
import { isWebBtAvailable, getDevice, getCharacteristic } from '../utils/bluetooth';

import cc2650uuids from '../utils/cc2650uuids';

const motionUudiInfo = cc2650uuids.motion;

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

  const configSensors = async () => {
    const motionConfigChar = await getCharacteristic(
      motionUudiInfo.uuid,
      motionUudiInfo.characteristics.motion_config.uuid,
    );
    // ............................................... to be encapsulated into a function
    // https://github.com/futomi/html5-CC2650SensorTag.js/blob/master/CC2650SensorTag.js#L663
    // first byte (enable)
    let v1 = 0b00000000;
    for (let i = 0; i < 8; i++) {
      // enable everyting
      // eslint-disable-next-line no-bitwise
      const nv = 1 << i;
      // eslint-disable-next-line no-bitwise
      v1 |= nv;
    }
    const bufferView1 = new Uint8Array([v1]);
    // second byte (range)
    const bufferView2 = new Uint8Array([0]); // 0=2G, 1=4G, 2=8G, 3=16G
    // merge 2 bytes
    const bufferView = new Uint8Array(2);
    bufferView.set(bufferView1, 0);
    bufferView.set(bufferView2, 1);
    // ...............................................
    await motionConfigChar.writeValue(bufferView);
  };

  const startRecording = async () => {
    setLoading();
    getCharacteristic(
      motionUudiInfo.uuid,
      motionUudiInfo.characteristics.motion_data.uuid,
    ).then((characteristic) => {
      setTimeoutID(setInterval(() => {
        characteristic.readValue().then((dataView) => {
          // const data = dataView.getUint8(0);
          const accDiv = 2; // 2G
          const gyrX = dataView.getInt16(0, true) / (65536 / 500);
          const gyrY = dataView.getInt16(2, true) / (65536 / 500);
          const gyrZ = dataView.getInt16(4, true) / (65536 / 500);
          const accX = dataView.getInt16(6, true) / (32768 / accDiv);
          const accY = dataView.getInt16(8, true) / (32768 / accDiv);
          const accZ = dataView.getInt16(10, true) / (32768 / accDiv);
          const magX = dataView.getInt16(12, true);
          const magY = dataView.getInt16(14, true);
          const magZ = dataView.getInt16(16, true);
          const payload = {
            timestamp: Date.now(),
            gyrX,
            gyrY,
            gyrZ,
            accX,
            accY,
            accZ,
            magX,
            magY,
            magZ,
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
              setLoading();
              try {
                await getDevice(deviceNamePrefix);
                await configSensors();
              } finally {
                unsetLoading();
              }
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
