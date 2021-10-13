const createSettingsSlice = (set) => ({
  deviceNamePrefix: 'CC2650',
  retrievalInterval: 0,
  recordingCharacteristics: {},
  setDeviceNamePrefix: (deviceNamePrefix) => {
    set(() => ({
      deviceNamePrefix,
    }));
  },
  setRetrievalInterval: (retrievalInterval) => {
    set(() => ({
      retrievalInterval,
    }));
  },
});

export default createSettingsSlice;
