import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import shallow from 'zustand/shallow';
import useStore from '../store';

import Layout from '../components/Layout';
import cc2650Services from '../utils/cc2650services';
import { isWebBtAvailable, getDevice, getCharacteristic } from '../utils/bluetooth';

export default function Page() {
  const { bluetoothDevice } = useStore((state) => state.bt, shallow);
  const [started, setStarted] = useState(null);

  const services = [];
  Object.keys(cc2650Services).forEach((s) => services.push(cc2650Services[s]));

  const getContent = () => {
    if (isWebBtAvailable()) {
      if (bluetoothDevice != null) {
        return (
          <div className="pt-2 px-2">
            {/* <HomeDeviceView /> */}
            <h1>{bluetoothDevice.name}</h1>
            { started
              ? (
                <Button
                  variant="contained"
                  className="w-32"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearInterval(started);
                    setStarted(null);
                  }}
                >
                  Stop
                </Button>
              )
              : (
                <Button
                  variant="contained"
                  className="w-32"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    getCharacteristic(
                      0x180f,
                      '00002a19-0000-1000-8000-00805f9b34fb',
                    ).then((characteristic) => {
                      setStarted(setInterval(() => {
                        characteristic.readValue().then((dataView) => {
                          // eslint-disable-next-line no-console
                          console.log(dataView.getUint8(0));
                        });
                      }, 500));
                    });
                  }}
                >
                  Start
                </Button>
              )}
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
              await getDevice();
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
