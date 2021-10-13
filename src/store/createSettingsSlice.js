const createSettingsSlice = (set) => ({
  settings: {
    deviceNamePrefix: 'CC2650',
    retrievalInterval: 0,
    selectedData: {},
    allowMarking: true,
    setDeviceNamePrefix: (deviceNamePrefix) => {
      set((state) => ({
        settings: {
          ...state.settings,
          deviceNamePrefix,
        },
      }));
    },
    setRetrievalInterval: (retrievalInterval) => {
      set((state) => ({
        settings: {
          ...state.settings,
          retrievalInterval,
        },
      }));
    },
    setSelectedData: (selectedData) => {
      set((state) => ({
        settings: {
          ...state.settings,
          selectedData,
        },
      }));
    },
  },
});

export default createSettingsSlice;
