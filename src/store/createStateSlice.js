const createStateSlice = (set) => ({
  state: {
    isLoading: false,
    setLoading: () => {
      set((state) => ({
        state: {
          ...state.state,
          isLoading: true,
        },
      }));
    },
    unsetLoading: () => {
      set((state) => ({
        state: {
          ...state.state,
          isLoading: false,
        },
      }));
    },
  },
});

export default createStateSlice;
