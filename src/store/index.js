import create from 'zustand';

import createBtSlice from './createBtSlice';
import createSettingsSlice from './createSettingsSlice';
import createStateSlice from './createStateSlice';

const useStore = create((set, get) => ({
  ...createBtSlice(set, get),
  ...createSettingsSlice(set, get),
  ...createStateSlice(set, get),
}));

export default useStore;
