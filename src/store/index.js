import create from 'zustand';

import createBtSlice from './createBtSlice';
import createSettingsSlice from './createSettingsSlice';

const useStore = create((set, get) => ({
  bt: createBtSlice(set, get),
  settings: createSettingsSlice(set, get),
}));

export default useStore;
