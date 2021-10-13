const createBtSlice = () => ({
  bt: {
    bluetoothDevice: null,
    gattServer: null,
    services: {},
  },
});

export default createBtSlice;
