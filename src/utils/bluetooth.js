import useStore from '../store';

export const isWebBtAvailable = () => {
  if (navigator.bluetooth) {
    return true;
  }
  return false;
};

export const getDevice = async (namePrefix = 'CC2650') => {
  const { bt } = useStore.getState();
  if (isWebBtAvailable()) {
    const bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{
        namePrefix,
      }],
      optionalServices: [0x180f],
    });
    useStore.setState({ bt: { ...bt, bluetoothDevice } });
    return bluetoothDevice;
  }
  throw Error();
};

export const getGattServer = async () => {
  const { bt } = useStore.getState();
  const { bluetoothDevice, gattServer } = bt;
  if (gattServer != null) {
    return gattServer;
  }
  if (bluetoothDevice != null) {
    const newGattServer = await bluetoothDevice.gatt.connect();
    useStore.setState({ bt: { ...bt, gattServer: newGattServer } });
    return newGattServer;
  }
  throw Error();
};

export const getService = async (uuid) => {
  const { bt } = useStore.getState();
  const { bluetoothDevice, services } = bt;
  if (bluetoothDevice != null) {
    if (services != null && services[uuid]) {
      return services[uuid];
    }
    const gattServer = await getGattServer();
    const service = await gattServer.getPrimaryService(uuid);
    if (!service) {
      throw Error();
    }
    useStore.setState({
      bt: {
        ...bt,
        services: {
          ...services,
          uuid: service,
        },
      },
    });
    return service;
  }
  throw Error();
};

export const getCharacteristic = async (serviceUuid, characteristicUuid) => {
  const { bt } = useStore.getState();
  const { bluetoothDevice, characteristics } = bt;
  if (bluetoothDevice != null) {
    const service = await getService(serviceUuid);
    const characteristic = await service.getCharacteristic(characteristicUuid);
    useStore.setState({
      bt: {
        ...bt,
        characteristics: {
          ...characteristics,
          characteristicUuid: service,
        },
      },
    });
    return characteristic;
  }
  return null;
};
